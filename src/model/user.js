const mongoose  = require('mongoose')

const user  = mongoose.Schema({
    name:{
        type:String
    },
    emial:{
        type:String
    },
    phone:{
        type:Number
    },
    gender:{
        type:String
    }
})

const User  = mongoose.model('User',user)

module.exports = User
