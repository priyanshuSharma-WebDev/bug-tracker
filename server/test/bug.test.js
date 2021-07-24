const request = require("supertest")
const app = require("../app");
const bugsModal = require("../models/bugs.model")
const {
    USER_ID,
    user,
    setupDatabase
} = require("./fixtures/db")

beforeEach(setupDatabase)

test("Should create a new bug in project.",async () => {
    
})