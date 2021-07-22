const request = require("supertest")
const app = require("../app");
const userModal = require("../models/users.model")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")

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

beforeEach(async () => {
    await userModal.deleteMany()
    await new userModal(user).save()
})

test('should send signup email to the user.',async () => {
    await request(app)
    .post('/api/users/create')
    .send({
        username: "test",
        fullName: "test user",
        email: "priyanshu.sharma5076@gmail.com",
        password: "test-user"
    })
    .expect(200)
})

test('should login existing user',async () => {
    await request(app)
    .post('/api/users/login')
    .send({
        email_username: user.email,
        password: user.password
    })
    .expect(200)
})

test('should not login existing user',async () => {
    await request(app)
    .post('/api/users/login')
    .send({
        email_username: user.email,
        password: "user.password"
    })
    .expect(400)
})

test('should fetch user profile.',async () => {
    await request(app)
    .get('/api/users/me')
    .set("Authorization",`Bearer ${user.tokens[0].token}`)
    .send()
    .expect(200)
})

test('should not fetch user profile.',async () => {
    await request(app)
    .get('/api/users/me')
    .send()
    .expect(401)
})


test('should delete user account.',async () => {
   await request(app)
   .delete('/api/users/delete')
   .set("Authorization",`Bearer ${user.tokens[0].token}`)
   .send()
   .expect(200)
})


test('should not delete account for UnAuthenticate user.',async () => {
    await request(app)
    .delete('/api/users/delete')
    .send()
    .expect(401)
 })



// this test is for admin users

// test('should delete a user.',async () => {
//    await request(app)
//    .delete(`/api/users/delete/user/${PROJECT_ID}`)
//    .send({userId: user._id})
//    .expect(200)
// })