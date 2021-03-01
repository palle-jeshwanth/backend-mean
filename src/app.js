const express = require('express');
const bodyParser = require('body-parser')

const userRoutes =  require('./routes/user')
const app = express()

app.use(express.json())
app.use(bodyParser.json())
require('./db/mongoose')


app.use('/users',userRoutes)

app.listen(3000,()=>{
    console.log('listening on pirt 30000');
})