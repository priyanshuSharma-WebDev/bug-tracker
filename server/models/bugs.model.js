const mongoose = require("mongoose")

const BugsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    severity: {
        /**
         * trivial
         * minor
         * major
         * crash
         * block
         * tweak
         */
        type: String,
        required: true,
        trim: true
    },
    submittedBy: {
        type: String,
        required: true,
        trim: true
    },
    assignedTo: {
        type: String,
        trim: true
    },
    viewStatus: {
        /**
         * public
         * private
         */
        type: String,
        required: true,
        trim: true
    },
    priority: {
        /**
         * none
         * low
         * normal
         * high
         * urgent
         * immediate
         */
        type: String,
        required: true,
        trim: true
    },
    project: {
        type: String,
        required: true,
        trim: true
    },
    resolved: {
        type: Boolean,
        default: false
    },
    assigned: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'project'
    },
    bugUpload: {
        type: Buffer
    }
}, {
    timestamps: true
})


const bugsModal = mongoose.model('bug', BugsSchema);

module.exports = bugsModal