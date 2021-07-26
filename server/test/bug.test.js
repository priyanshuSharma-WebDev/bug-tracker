// const request = require("supertest")
// const app = require("../app");
// const bugsModal = require("../models/bugs.model")
// const {
//     USER_ID,
//     PROJECT_ID,
//     user,
//     setupDatabase
// } = require("./fixtures/db")

// beforeEach(setupDatabase)

// test("Should create a new bug in project.",async () => {
//     const response = await request(app)
//     .post("/api/bugs/create")
//     .set("Authorization",`Bearer ${user.tokens[0].token}`)
//     .field("title", "test bug")
//     .field("description","this is a test bug")
//     .field("severity","minor")
//     .field("submittedBy","priyanshu sharma")
//     .field("assignedTo","unknown")
//     .field("viewStatus","public")
//     .field("priority","low")
//     .field("project","bug tracker")
//     .field("resolved",false)
//     .field("assigned",true)
//     .field("project_id",`${PROJECT_ID}`)
//     .attach("upload","test/fixtures/nagatoro.png")
//     .expect(201)
//     const bug = await bugsModal.findById(response.body._id)
//     expect(bug).not.toBeNull()
// })

test("should create a bug.",async () => {
    
})