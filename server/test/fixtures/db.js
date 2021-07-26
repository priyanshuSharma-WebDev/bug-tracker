const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const userModal = require("../../models/users.model")
const projectsModal = require("../../models/projects.model")
const bugsModal = require("../../models/bugs.model")

const USER_ID = new mongoose.Types.ObjectId()
const PROJECT_ID = new mongoose.Types.ObjectId()

const user = {
    _id: USER_ID,
    username: "default test",
    isAdmin: true,
    isHaveProject: true,
    fullName: "default test user",
    email: "priyanshu.sharma5076@gmail.com",
    password: "default-test-user",
    tokens: [{ 
        token: jwt.sign({_id: USER_ID},process.env.JWT_SECRET)
    }]
}


const setupDatabase = async () => {
    await userModal.deleteMany()
    await projectsModal.deleteMany()
    await bugsModal.deleteMany();
    await new userModal(user).save()
}

module.exports = {
    USER_ID,
    user,
    setupDatabase
}