const express = require('express');
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')

require('./db/mongoose')
const userRoutes = require('./routes/user')
const taskRoutes = require('./routes/task')

app.use(cors())
app.use(express.json())
app.use('/users', userRoutes)
app.use('/tasks',taskRoutes)

app.listen(3000, () => {
    console.log('listening on port 3000');
})