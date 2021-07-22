const express = require("express");
const userModal = require("../models/users.model");
const { BadRequest, NotFound, UnAuthorized } = require("../utils/error.handling");
const Authentication = require("../auth/JWT.auth")
const multer = require("multer")
const Router = express.Router();
const bcrypt = require("bcrypt")
const sharp = require("sharp")
const jwt = require("jsonwebtoken")
const sendingMail = require("../utils/sending.email");
const isAdmin = require("../middleware/isAdmin");
const projectsModal = require("../models/projects.model");
const updateUserProperty = require("../utils/updateUserProp");
const bugsModal = require("../models/bugs.model");


/**
 * [*] /POST /create - create a user
 * [*] /GET /me/:id - get a user 
 * [*] /PATCH /update/:id - update a user 
 * [*] /DELETE /delete/:id  - delete a user
 * [*] /POST /login - login a user 
 * [*] /POST /logout - logout a user 
 * [*] /POST /logoutAll - logout user with all devices
 * [*] Add maximum device limits
 * [*] create relation between user and bugs
 * [*] /POST /avatar - Add file upload
 * [*] /GET /confirm/account/:token - Add email sending
 * [*] /PUT /forget-password - Forgot password
 * [*] /GET / get all users
 * [*] /DELETE /delete/user/:id delete a user
 * [*] Add projects feature
 * [*] edit password
 * [*] edit email
 * TODO - [] push notification
 */



Router.post("/create", async (req, res, next) => {
    try {
        if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
            throw new BadRequest("Missing: request body content")
        }
        const { username, email } = req.body
        const token = jwt.sign(
            {
                // expire in 1 hour
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: req.body
            }, process.env.JWT_SECRET)
        const mailUser = {
            email: email,
            name: username,
            title: "Welcome to our app",
            body: `
            <h1>Please click the given link to activate your accound.</h1>
            <p>${process.env.HOST}/api/users/confirm/account/${token}</p>
            `
        }
        sendingMail(mailUser)
        res.json({
            message: "Please kindly confirm your account"
        })
    }
    catch (e) {
        next(e)
    }
})

Router.get("/me", Authentication, async (req, res, next) => {
    try {
        res.json(req.user)
    }
    catch (e) {
        next(e)
    }
})




/**
 * Get all users related to a project this route is only accesable by admin
 * - :id = project id
 */
Router.get("/all/users/:id",Authentication, isAdmin,async (req,res,next) => {
    const id = req.params.id
    try {
        const project = await projectsModal.findById(id)
        if(!project.users.length) {
            throw new BadRequest("You haven't created any user yet")
        }
        const projectUsers = await userModal.find({
            "_id": {
                "$in": project.users
            }
        })
        res.json(projectUsers)
    }
    catch(e) {
        next(e)
    }
})

Router.delete("/delete/user/:project_id",Authentication, isAdmin, async (req,res,next) => {
    const projectId = req.params.project_id
    const {userId} = req.body
    try {
        let project = await projectsModal.findById(projectId)
        if(!project) {
            throw new NotFound("project not found")
        }
        project.users = project.users.filter(_id => _id.toString() !== userId.toString())
        await project.save();
        let user = await userModal.findById(userId)
        if(!user) {
            // throw internal server error
            throw new Error("User not found")
        }
        const updateProp = {isHaveProject: false}
        await updateUserProperty(user,updateProp).save()
        res.json({
            message: "user deleted successfully"
        })
    }
    catch(e) {
        next(e)
    }
})


Router.get("/confirm/account/:token", async (req, res, next) => {
    const token = req.params.token
    let user = {};
    try {
        try {
            user = jwt.verify(token, process.env.JWT_SECRET)
        }
        catch (e) {
            throw new UnAuthorized("Invalid token")
        }
        await new userModal(user.data).save()
        res.status(201).json(user)
    }
    catch (e) {
        next(e)
    }
})


Router.post("/login", async (req, res, next) => {
    try {
        if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
            throw new BadRequest("Missing: request body content")
        }
        const { email_username, password } = req.body
        const user = await userModal.findOne({ $or: [{ email: email_username }, { username: email_username }] })
        if (user.tokens.length > 2) {
            throw new BadRequest("You are only allow to login with minimum 3 devices")
        }
        if (!user) {
            throw new NotFound("User not found")
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            throw new BadRequest("Email or password doesn't match")
        }
        const token = await user.generateJsonWebToken()
        res.json({ user, token })

    }
    catch (e) {
        next(e)
    }
})


Router.put("/forgot-password", Authentication, async (req, res, next) => {
    try {
        const { email } = req.body
        const user = await userModal.findOne({ email })
        if (!user) {
            throw new NotFound("User with this email doesn't exists")
        }
        const token = jwt.sign(
            {
                // expire in 1 hour
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: user._id

            }, process.env.RESET_PASSWORD)
        const mailUser = {
            email: email,
            title: "Forgot password",
            body: `
                <h1>Please click the given link to proceed forgot password query.</h1>
                <p>${process.env.HOST}/api/users/forgot/password/${token}</p>
            `
        }
        await user.updateOne({ resettingLink: token })
        sendingMail(mailUser)
        res.json({
            message: "Email has been sent, Please kindly follow the instructions"
        })
    }
    catch (e) {
        next(e)
    }
})

Router.put("/reset-password", Authentication, async (req, res, next) => {
    try {
        const { resetLink, newPassword } = req.body
        if (!resetLink) {
            throw new UnAuthorized("Authentication error!")
        }
        try {
            jwt.verify(resetLink, process.env.RESET_PASSWORD)
        }
        catch (e) {
            throw new UnAuthorized("Incorrect token or it's expired")
        }
        const encryptedPassword = await bcrypt.hash(newPassword, 12)
        let user = await userModal.findOne({ resettingLink: resetLink })
        // I could remove token form client side when user reset password first time or update resettingLink to 
        // the empty string form server side and that's approach I will take
        if(!user) {
            throw new UnAuthorized("User already reset password, Please generate new token.")
        }
        const updateProp = {
            password: encryptedPassword,
            resettingLink: ""
        }
        await updateUserProperty(user,updateProp).save()
        res.json({
            message: "Password update successfully"
        })

    }
    catch (e) {
        next(e)
    }
})


Router.put("/change-password",Authentication, async (req,res,next) => {
    const user = req.user;
    const {oldPassword,newPassword} = req.body;
    try {
        const isVerified = await bcrypt.compare(oldPassword,user.password)
        if(!isVerified) {
            throw new UnAuthorized("Old password did not match.")
        }
        const updateProp = {
            password: newPassword
        }
        await updateUserProperty(req.user,updateProp).save()
        res.json({
            message: "password updated successfully."
        })
    }
    catch(e) {
        next(e)
    }
})



Router.put("/change-email",Authentication, async (req,res,next) => {
    const user = req.user;
    const {password,newEmail} = req.body;
    try {
        const isVerified = await bcrypt.compare(password,user.password)
        if(!isVerified) {
            throw new UnAuthorized("Password did not match.")
        }
        const token = jwt.sign(
            {
                // expire in 1 hour
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                email: newEmail
            }, process.env.JWT_SECRET)
            const mailUser = {
                email: newEmail,
                title: "Verify your email",
                body: `
                <h1>Please click to verify your email.</h1>
                <p>${process.env.HOST}/api/users/change-email/save/${token}</p>
                `
            }
            sendingMail(mailUser)
        res.json({
            message: "Verify your email."
        })
    }
    catch(e) {
        next(e)
    }
})


Router.get("/change-email/save/:token",Authentication, async (req,res,next) => {
    const token = req.params.token;
    let data = {}
    try {
        try {
            data = jwt.verify(token, process.env.JWT_SECRET)
        }
        catch (e) {
            throw new UnAuthorized("Incorrect token or it's expired")
        }
        const updateProp = {
            email: data.email
        }
        await updateUserProperty(req.user,updateProp).save()
        res.json({
            message: "Email changed successfully"
        })
    }
    catch(e) {
        next(e)
    }
})


Router.post("/logout", Authentication, async (req, res, next) => {
    try {
        req.user.tokens = req.user.tokens.filter(tok => tok.token !== req.token)
        await req.user.save()
        res.json({
            message: "User logout successfully"
        })
    }
    catch (e) {
        next(e)
    }
})



Router.post("/logoutAll", Authentication, async (req, res, next) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.json({
            message: "User logout successfully from all devices"
        })
    }
    catch (e) {
        next(e)
    }
})




Router.patch("/update", Authentication, async (req, res, next) => {
    const keys = Object.keys(req.body);
    const updateableProps = ["username", "fullName", "email", "password"]
    const isValid = keys.every(key => updateableProps.includes(key))
    try {
        if (!isValid) {
            throw new BadRequest("Some invalid propety found in request")
        }
        const user = req.user
        keys.forEach(update => user[update] = req.body[update])
        await user.save()
        res.json(user)
    }
    catch (e) {
        next(e)
    }
})

Router.delete("/delete", Authentication, async (req, res, next) => {
    const {projectId} = req.body;
    try {
        await req.user.remove()
        await bugsModal.deleteMany({ owner: req.user._id });
        await projectsModal.deleteOne({_id: projectId})
        res.json(req.user)
    }
    catch (e) {
        next(e)
    }
})


const upload = multer({
    limits: {
        // only 2MB file user can upload
        fileSize: 2000000
    },
    fileFilter(req, file, cb) {
        const regex = /\.(png|jpg|jpeg|jfif|svg)$/
        if (!file.originalname.match(regex)) {
            return cb(new BadRequest("File type must be - (png,jpg,jpeg,jfif,svg)"))
        }
        cb(undefined, true)
    }
})


Router.post("/avatar", Authentication, upload.single('upload'), async (req, res, next) => {
    try {
        // resize image by 500 x 500 and convert it into .png
        req.user.avatar = await sharp(req.file.buffer).resize({ widht: 500, height: 500 }).png().toBuffer()
        await req.user.save()
        res.json({
            message: "Avatar upload successfully"
        })
    }
    catch (e) {
        next(e)
    }
})


Router.delete("/delete/avatar", Authentication, async (req, res, next) => {
    try {
        req.user.avatar = undefined
        await req.user.save()
        res.json({
            message: "Avatar deleted successfully"
        })
    }
    catch (e) {
        next(e)
    }
})

Router.get("/serve/:id/avatar", async (req, res, next) => {
    const id = req.params.id
    try {
        const user = await userModal.findById(id)
        if (!user || !user.avatar) {
            throw new NotFound("Avatar not found")
        }
        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    }
    catch (e) {
        next(e)
    }
})




module.exports = Router