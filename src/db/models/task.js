const mongoose = require('mongoose')
const validator = require('validator')

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: 'Task description is required.',
        trim: true
    }, 
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = Task