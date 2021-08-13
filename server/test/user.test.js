const request = require("supertest")
const app = require("../app");
const userModal = require("../models/users.model")
const {
    USER_ID,
    user,
    setupDatabase
} = require("./fixtures/db")

beforeEach(setupDatabase)


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
    const response = await request(app)
    .post('/api/users/login')
    .send({
        email_username: user.email,
        password: user.password
    })
    .expect(200)
    const loginUser = await userModal.findById(response.body.user._id)
    expect(response.body.token).toBe(loginUser.tokens[1].token)

   
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
   const response = await request(app)
   .delete('/api/users/delete')
   .set("Authorization",`Bearer ${user.tokens[0].token}`)
   .send()
   .expect(200)
   const deleteUser = await userModal.findById(response.body._id)
   expect(deleteUser).toBeNull()
})


test('should not delete account for UnAuthenticate user.',async () => {
    await request(app)
    .delete('/api/users/delete')
    .send()
    .expect(401)
 })


 test('should post profile pic.',async () => {
     await request(app)
     .post('/api/users/avatar')
     .set("Authorization",`Bearer ${user.tokens[0].token}`)
     .attach('upload','test/fixtures/profile.jpg')
     .expect(200)

     const getUser = await userModal.findById(USER_ID)
     expect(getUser.avatar).toEqual(expect.any(Buffer))
 })


 test('should update user information fields.',async () => {
     const response = await request(app)
        .patch('/api/users/update')
        .set("Authorization",`Bearer ${user.tokens[0].token}`)
        .send({
            username: "edit test",
            fullName: "BOOM BOOM BOOM"
        })
        .expect(200)

    const {username,fullName} = await userModal.findById(response.body._id)
    expect({username,fullName}).toEqual({
        username: "edit test",
        fullName: "BOOM BOOM BOOM"
    })
 })

 test('should failed to update user information fields when user send invalid properties.',async () => {
    await request(app)
    .patch('/api/users/update')
    .set("Authorization",`Bearer ${user.tokens[0].token}`)
    .send({
        email: "somerandomemail@gmail.com"
    })
    .expect(400)
 })

 test("should failed to update user information fields when user doesn't send any data.",async () => {
    await request(app)
    .patch('/api/users/update')
    .set("Authorization",`Bearer ${user.tokens[0].token}`)
    .send({})
    .expect(400)
 })


// this test is for admin users

// test('should delete a user.',async () => {
//    await request(app)
//    .delete(`/api/users/delete/user/${PROJECT_ID}`)
//    .send({userId: user._id})
//    .expect(200)
// })