const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const userModal = require("../../models/users.model")
const projectsModal = require("../../models/projects.model")
const bugsModal = require("../../models/bugs.model")

const USER_ID = new mongoose.Types.ObjectId()
const USER2_ID = new mongoose.Types.ObjectId()
const PROJECT_ID = new mongoose.Types.ObjectId()
const BUG_ID = new mongoose.Types.ObjectId()

const user = {
    _id: USER_ID,
    username: "test",
    isAdmin: true,
    isHaveProject: true,
    fullName: "test user",
    email: "priyanshu.sharma5076@gmail.com",
    password: "test-user",
    tokens: [{ 
        token: jwt.sign({_id: USER_ID},process.env.JWT_SECRET)
    }]
}

const user2 = {
    _id: USER2_ID,
    username: "test2",
    isAdmin: false,
    isHaveProject: true,
    fullName: "test2 user",
    email: "priyanshushrama709@gmail.com",
    password: "test-user",
    tokens: [{ 
        token: jwt.sign({_id: USER2_ID},process.env.JWT_SECRET)
    }]
}

const bug = {
    _id: BUG_ID,
    title: "test bug",
    description: "this is a test bug",
    severity: "minor",
    submittedBy: "priyanshu sharma",
    assignedTo: "unknown",
    viewStatus: "public",
    priority: "low",
    project: "bug tracker",
    resolved: false,
    assigned: true,
    project_id: PROJECT_ID,
    owner: USER_ID
}


const project = {
    _id: PROJECT_ID,
    name: 'test project',
    users: [USER_ID,USER2_ID]
}

const setupDatabase = async () => {
    await userModal.deleteMany()
    await projectsModal.deleteMany()
    await bugsModal.deleteMany()
    await new userModal(user).save()
    await new userModal(user2).save()
    await new bugsModal(bug).save()
    // await new bugsModal(bug2).save()
    // await new bugsModal(bug3).save()
    await new projectsModal(project).save()
}

module.exports = {
    USER_ID,
    PROJECT_ID,
    user,
    project,
    setupDatabase
}