const mongoose = require('mongoose')
const task = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    }
})

const Task = mongoose.model('Task', task)

module.exports = Task
