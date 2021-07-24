const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const userModal = require("../../models/users.model")
const projectsModal = require("../../models/projects.model")

const USER_ID = new mongoose.Types.ObjectId()
const PROJECT_ID = new mongoose.Types.ObjectId()

const user = {
    _id: USER_ID,
    username: "test",
    fullName: "test user",
    email: "priyanshu.sharma5076@gmail.com",
    password: "test-user",
    tokens: [{ 
        token: jwt.sign({_id: USER_ID},process.env.JWT_SECRET)
    }]
}

const project = {
    _id: PROJECT_ID,
    name: 'test project'
}

const setupDatabase = async () => {
    await userModal.deleteMany()
    await projectsModal.deleteMany()
    await new userModal(user).save()
    await new projectsModal(project).save()
}

module.exports = {
    USER_ID,
    PROJECT_ID,
    user,
    project,
    setupDatabase
}