const mongoose = require("mongoose")

const projectsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    users: [{}]
},{
    timestamps: true
})

projectsSchema.virtual('projectBugs',{
    ref: 'bug',
    localField: '_id',
    foreignField: 'project'
})


const projectsModal = mongoose.model('project',projectsSchema);

module.exports = projectsModal