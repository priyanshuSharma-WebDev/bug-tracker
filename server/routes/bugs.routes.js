const express = require("express")
const {
    BadRequest,
    NotFound,
    Unauthorized
} = require("../utils/error.handling")
const bugsModal = require("../models/bugs.model");
const Authentication = require("../auth/JWT.auth");
const projectsModal = require("../models/projects.model");
const multer = require("multer")
const sharp = require("sharp")
const _ = require("lodash")
const Router = express.Router();

/**
 *   [*]  /GET "/:id" - all bugs of a project - catch "if user doesn't create or join to  a project fetch
 *        bugs only readonly format"
 *   [*] /POST "/create" - create a bug
 *   [*]  /GET "/bug/:id" - get a bug
 *   [*]  /GET "/resolve/:id" - resolve a bug
 *   [*]  /PATCH "/update/:id" - update a bug
 *   [*]  /DELETE "/delete/:id" - delete a bug
 *   [*] /DELETE "/deleteAll" - delete all bugs
 *   [*] /GET "/user/bugs" - get all bugs of a perticular user
 *   [*] /GET "/bugs" - get all bugs with in whole application - catch "only readonly format"
 *   [*] /POST "/bugUpload" - upload images related to the bug
 *   [*] - filtering data
 *   TODO - [] Add a comment section in a bug
 *   TODO - [] Project Assignement
 */

/**
 * filtering
 * GET /?resolved=true
 * GET /?limit=20&skip=0
 * GET /?sort=createdAt:asc || desc
 * 
 * here i set skip=0 that mean it will fetch first 20 documents, if I set skip=20 then it will skip first 20 documents and fetch next 20 documents and if I set skip=40 then it will skip first 40 document and fetch 20 document that came after first 40 documents
 */
Router.get("/", async (req, res, next) => {
    const match = {}
    let parts = []
    try {
        if (req.query.resolved) {
            match.resolved = req.query.resolved === 'true'
        }
        if (req.query.sort) {
            parts = req.query.sort.split(":")
        }
        const bugs = await bugsModal.find(match, { bugUpload: 0 })
            .limit(parseInt(req.query.limit))
            .skip(parseInt(req.query.skip))
            .sort([[parts.length ? parts[0] : 'createdAt', parts.length ? parts[1] === 'asc' ? 1 : -1 : 1]])
        res.json(bugs);
    }
    catch (e) {
        next(e)
    }
})



/**
 * when user doesn't create or join a project he/she can access this route
 * filtering
 * GET /?resolved=true
 * GET /?limit=20&skip=0
 * GET /?sort=createdAt:asc||desc
 * 
 * here i set skip=0 that mean it will fetch first 20 documents, if I set skip=20 then it will skip first 20 documents and fetch next 20 documents and if I set skip=40 then it will skip first 40 document and fetch 20 document that came after first 40 documents
 */

Router.get("/project/bugs/:id", Authentication, async (req, res, next) => {
    const id = req.params.id
    const match = {}
    const sort = {}
    try {
        const project = await projectsModal.findById(id)
        if (req.query.resolved) {
            match.resolved = req.query.resolved === 'true'
        }
        if (req.query.sort) {
            const parts = req.query.sort.split(":")
            console.log(parts)
            sort[parts[0]] = parts[1] === 'asc' ? 1 : -1
        }
        if (!project) {
            throw new NotFound("Project not found")
        }
        await project.populate({
            path: "projectBugs",
            select: 'title description severity\
            submittedBy assignedTo viewStatus\
             priority project resolved assigned',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.json(project.projectBugs)
    }
    catch (e) {
        next(e)
    }
})





/**
 * Only authorized user can access this route
 */
/**
 * filtering
 * GET /?resolved=true
 * GET /?limit=20&skip=0
 * GET /?sort=createdAt:asc || desc
 * 
 * here i set skip=0 that mean it will fetch first 20 documents, if I set skip=20 then it will skip first 20 documents and fetch next 20 documents and if I set skip=40 then it will skip first 40 document and fetch 20 document that came after first 40 documents
 */
Router.get("/user/bugs", Authentication, async (req, res, next) => {
    const match = {}
    let parts = []
    try {
        const user = req.user
        match.owner = user._id
        if (req.query.resolved) {
            match.resolved = req.query.resolved === 'true'
        }
        if (req.query.sort) {
            parts = req.query.sort.split(":")
        }
        const userBugs = await bugsModal.find(match, { bugUpload: 0 })
            .limit(parseInt(req.query.limit))
            .skip(parseInt(req.query.skip))
            .sort([[parts.length ? parts[0] : 'createdAt', parts.length ? parts[1] === 'asc' ? 1 : -1 : 1]])
        res.json(userBugs)
    }
    catch (e) {
        next(e)
    }
})




const upload = multer({
    limits: {
        // only upto 2MB file user can upload
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


/**
 * This route only accessable when user create or join to a project
 */
Router.post("/create", Authentication, upload.single('upload'), async (req, res, next) => {
    const {
        project_id,
        title,
        description,
        severity,
        submittedBy,
        assignedTo,
        viewStatus,
        priority,
        project,
        resolved,
        assigned
    } = req.body
    const formData = {
        title,
        description,
        severity,
        submittedBy,
        assignedTo,
        viewStatus,
        priority,
        project,
        resolved,
        assigned
    }
    try {
        if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
            throw new BadRequest("Missing: request body content")
        }
        const project = await projectsModal.findById(project_id)
        if (!project) {
            throw new NotFound("Project not found")
        }

        if (!req.user.isHaveProject) {
            throw new BadRequest("First create or join to a project")
        }

        /**
         * check user is in the project list if it's not then he don't have permission to create a bug
         */
        const isAllowed = project.users.find(({ _id }) => _id.equals(req.user._id))
        if (!isAllowed) {
            throw new Unauthorized("You don't have permission to create any bug, please create a project or join to a project")
        }
        /**
         * User will send project Id from frontend
         */
        const bug = new bugsModal({
            ...formData,
            owner: req.user._id,
            project: project_id,
            bugUpload: req.file !== undefined ? await sharp(req.file.buffer).resize({ widht: 1000, height: 1000 }).png().toBuffer() : undefined
        })
        const keys = {
            _id: null,
            title: null,
            description: null,
            severity: null,
            submittedBy: null,
            assignedTo: null,
            viewStatus: null,
            priority: null,
            project: null,
            resolved: null,
            assigned: null
        }
        await bug.save();
        var result = _.pick(bug, _.keys(keys));
        res.status(201).json(result)
    }
    catch (e) {
        next(e)
    }
})

/**
 * This route only accessable when user create or join to a project
 */
Router.get("/bug/:bug_id/:project_id", Authentication, async (req, res, next) => {
    const project_id = req.params.project_id
    const bug_id = req.params.bug_id
    try {
        const bug = await bugsModal.findOne({ _id: bug_id, project: project_id })
        if (!bug) {
            throw new NotFound("Bug: Not found")
        }
        res.json(bug)
    }
    catch (e) {
        next(e)
    }
})

/**
 * This route only accessable when user create or join to a project
 */
Router.get("/resolved/:resolve_id/:project_id", Authentication, async (req, res, next) => {
    const resolve_id = req.params.resolve_id
    const project_id = req.params.project_id
    try {
        const bug = await bugsModal.findOneAndUpdate(
            { _id: resolve_id, owner: req.user._id, project: project_id },
            { $set: { resolved: true } },
            { new: true, useFindAndModify: false }
        )
        if (!bug || !bug.resolved) {
            throw new BadRequest("There is some problem in your request")
        }
        res.json({
            message: "bug resolve successfully"
        })
    }
    catch (e) {
        next(e)
    }
})

/**
 * This route only accessable when user create or join to a project
 */
Router.patch("/update/:bug_id/:project_id", Authentication, async (req, res, next) => {
    const bug_id = req.params.bug_id
    const project_id = req.params.project_id
    const keys = Object.keys(req.body);
    const allowedUpdates = [
        "title",
        "description",
        "severity",
        "submittedBy",
        "assignedTo",
        "resolution",
        "viewStatus",
        "priority",
        "project",
        "assigned"
    ];
    try {
        const isallowed = keys.every(key => allowedUpdates.includes(key));
        if (!isallowed) {
            throw new BadRequest("Some invalid propety found in request")
        }
        const bug = await bugsModal.findOne({ _id: bug_id, owner: req.user._id, project: project_id })
        if (!bug) {
            throw new BadRequest("Task is not found to update")
        }
        keys.forEach(update => bug[update] = req.body[update]);
        await bug.save()
        res.send(bug)
    }
    catch (e) {
        next(e)
    }
})

/**
 * This route only accessable when user create or join to a project
 */
Router.delete("/delete/:bug_id/:project_id", Authentication, async (req, res, next) => {
    const bug_id = req.params.bug_id
    const project_id = req.params.project_id
    try {
        /**
         * Admin user should allow to delete this
         */
        const bug = await bugsModal.findOneAndDelete({ _id: bug_id, owner: req.user._id, project: project_id })
        if (!bug) {
            throw new NotFound("Bug not found")
        }
        res.json({
            message: "bug deleted successfully"
        })
    }
    catch (e) {
        next(e)
    }
})


/**
 * 
 * User will delete all bugs related to himself.
 * This route only accessable when user create or join to a project.
 *
 */
Router.delete("/deleteAll", Authentication, async (req, res, next) => {
    try {
        await bugsModal.deleteMany({ owner: user.req._id });
        res.json({
            message: "successfully deleted all bugs"
        })
    }
    catch (e) {
        next(e)
    }
})





Router.delete("/delete/bugUpload", Authentication, async (req, res, next) => {
    const { id } = req.body;
    try {
        const bug = await bugsModal.findById(id)
        if (!bug) {
            throw new NotFound("Thread not found.")
        }
        bug.bugUpload = undefined
        await bug.save()
        res.json({
            message: "file deleted successfully"
        })
    }
    catch (e) {
        next(e)
    }
})



Router.get("/serve/:id/bugUpload", async (req, res, next) => {
    const id = req.params.id
    try {
        const bug = await bugsModal.findById(id)
        if (!bug || !bug.bugUpload) {
            throw new NotFound("File not found")
        }
        res.set('Content-Type', 'image/png')
        res.send(bug.bugUpload)
    }
    catch (e) {
        next(e)
    }
})


module.exports = Router;
