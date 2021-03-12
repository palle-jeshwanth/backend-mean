const express = require('express')
const router = express.Router()
const Task = require('../model/task')

router.post('/', async (req, res, next) => {
    let task = new Task(req.body)
    try {
        task = await task.save();
        if (!task) {
            return res.send({
                status: 'Failed',
                code: 0,
                message: 'Task not added',
                data: null
            })
        }
        return res.send({
            status: 'Success',
            code: 1,
            message: 'Task added',
            data: task
        })
    } catch (error) {
        res.status(401).send(error.message)
    }
})

router.get('/', async (req, res, next) => {
    try {
        const tasks = await Task.find({});
        if (!tasks.length) {
            return res.send({
                status: 'Failed',
                code: 0,
                message: 'Tasks not found',
                data: []
            })
        }
        res.send({
            status: 'Success',
            code: 1,
            message: 'Tasks fetched',
            data: tasks
        })
    } catch (error) {
        res.status(404).send(error.message)
    }
})


router.delete('/:id', async (req, res, next) => {
    try {
        const task = await Task.findByIdAndDelete({ _id: req.params.id })
        if (!task) {
            return res.send({
                status: "failure",
                code: 0,
                data: null,
                message: "Task not found"
            })
        }
        res.send({
            status: "success",
            code: 1,
            data: task,
            message: "Task deleted successfully"
        })
    } catch (error) {
        res.status(500).send('Internal server error')
    }
})

router.put('/', async (req, res, next) => {
    try {
        console.log(req.body._id)
        let task = await Task.findOne({ _id: req.body._id })
        if (!task) {
            return res.send({
                status: 'Failure',
                code: 0,
                data: null,
                message: "Task not found"
            })
        }
        console.log(task)
        delete req.body._id;
        task = await Task.findByIdAndUpdate(task._id, req.body)
        res.send({
            status: 'Success',
            code: 1,
            data: task,
            message: "Task Updated"
        })
    } catch (error) {
        res.status(500).send('Internal server error')
    }
})


module.exports = router;