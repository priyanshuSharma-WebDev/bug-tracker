const express = require("express");
const Authentication = require("../auth/JWT.auth")
const projectsModal = require("../models/projects.model");
const userModal = require("../models/users.model");
const isAdmin = require("../middleware/isAdmin");
const { BadRequest, NotFound } = require("../utils/error.handling");
const jwt = require("jsonwebtoken");
const sendingMail = require("../utils/sending.email");
const updateUserProperty = require("../utils/updateUserProp")
const Router = express.Router()


/**
 * /POST  "/create" - create a new project
 * /GET "/" - get all projects
 * /GET "/project/:id" - get project by id
 * /DELETE "/delete/project/:id" - delete a project
 * /GET "/leave/project/:id" - leave from a project
 */

Router.post("/create",Authentication, async (req,res,next) => {
    try {
        if(!Object.keys(req.body).length && req.body.constructor === Object) {
            throw new BadRequest("Missing: Request body content")
        }

        if(req.user.isHaveProject) {
            throw new BadRequest("User already have a active project.")
        }

        const updateProp = {
            isAdmin: true,
            isHaveProject: true
        }
        
        await updateUserProperty(req.user,updateProp).save()

        req.body = {...req.body, tags: req.body.tags.split(",").map(tag => tag.trim())};

        const project = new projectsModal({
            name: req.body.projectName,
            topic: req.body.tags,
            users: req.user._id
        })

        await project.save()

        res.status(201).json({
            message: "New Project created"
        })

    }
    catch(e) {
        next(e)
    }
})

Router.get("/",Authentication, async (req,res,next) => {
    try {
        const projects = await projectsModal.find({})
        if(!projects.length) {
            throw new NotFound("Peoples not create any projects yet")
        }
        res.json(projects)
    }
    catch(e) {
        next(e)
    }
})

Router.get("/project/:id",Authentication,async (req,res,next) => {
    const id = req.params.id
    try {
        const project = await projectsModal.findById(id)
        if(!project) {
            throw new NotFound("Project not found")
        }
        res.send(project)
    }
    catch(e) {
        next(e)
    }
})



Router.get("/my",Authentication,async (req,res,next) => {
    const user = req.user;
    try {
        const projects = await projectsModal.find({})
        const userProject = projects.find(pr => pr.users.find(usr => usr.toString() === user._id.toString()));
        if(userProject === undefined) {
            throw new BadRequest("Not found!")
        }
        res.send(userProject)
    }
    catch(e) {
        next(e)
    }
})

/**
 * POST /invite/:project_id?token=jwt_token
 */
Router.post("/invite/:project_id",async (req,res,next) => {
    const project_id = req.params.project_id
    
    try {
        if(!Object.keys(req.body).length && req.body.constructor === Object) {
            throw new BadRequest("Missing: request body content")
        }
        const project = await projectsModal.findById(project_id)
        if(!project) {
            throw new NotFound("Invalid project ID")
        }
        const {email} = req.body
        const token = jwt.sign({email,project_id},process.env.INVITE_CODE,{expiresIn: "20m"})
        const mailUser = {
            email: email,
            title: "Secret code",
            body: `
            <h1>Secret link for joining the project.</h1>
            <small>Please don't share this with anybody.</small>
            <p>${process.env.HOST}/api/projects/invite/accept/${token}</p>
            `
        }
        sendingMail(mailUser)
        res.json({
            message: "Email sent"
        })
    }
    catch(e) {
        next(e)
    }
})


Router.get("/invite/accept/:token",async (req,res,next) => {
    const token = req.params.token
    try {
        let data
        try {
            data = jwt.verify(token,process.env.INVITE_CODE)
        }
        catch(e) {
            throw new BadRequest(e.message)
        }
        const user = await userModal.findOne({email: data.email})

        if(!user) {
            /**
             * user will redirect to the create account on frontend
             */
            throw new NotFound("Invalid email,User not found")
        }
        let project = await projectsModal.findById(data.project_id);
        if(!project) {
            throw new NotFound("Project not found")
        }
        const isUserAlreadyExists = project.users.find(_id => _id.toString() === user._id.toString())
        if(isUserAlreadyExists) {
            throw new BadRequest("User already exists with this creadentials.")
        }
        project.users = project.users.concat(user._id)
        const updateProp = {
            isHaveProject: true
        }
        await updateUserProperty(user,updateProp).save()
        // save user to the in project array
        await project.save()
        res.json({
            message: "Please login first to create or view a bug"
        })
    }
    catch(e) {
        next(e)
    }
})


Router.delete("/delete/project/:id",Authentication,isAdmin, async (req,res,next) => {
    const id = req.params.id
    try {
        const project = await projectsModal.findOneAndDelete({ _id: id})
        if(!project) {
            throw new NotFound("project not found")
        }
        res.json({
            message: "project deleted successfully"
        })
    }
    catch(e) {
        next(e)
    }
})


Router.post("/leave/project/:id",async (req,res,next) => {
    const projectId = req.params.id
    const {userId} = req.body;
    try {
        const project = await projectsModal.findById(projectId)
        if(!project) {
            throw new NotFound("Project not found")
        }
        project.users = project.users.filter(_id => _id.toString() !== userId.toString())
        if(!project.users.length) {
            throw new BadRequest("This project has only one member if you want to abonded this project than it's better to delete this shit.")
        } 
        const user = await userModal.findById(userId)
        if(user.isAdmin) {
            throw new BadRequest("You are not allowed to leave this project it's better to delete this shit.")
        }
        await project.save()
        if(!user) {
            throw new Error("User not found, Internal server error.")
        }
        const updateProp = {
            isHaveProject: false
        }
        await updateUserProperty(user,updateProp).save()
        res.json({
            message: "user leave the project"
        })
    }
    catch(e) {
        next(e)
    }
})


module.exports = Router