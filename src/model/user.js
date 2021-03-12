const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const user = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    phone: {
        type: Number
    }
})

user.methods.generateToken = async function () {
    const user = this;
    const token = jwt.sign({ id: user._id }, "Bhanu@8247065499")
    return token;
}



user.pre('save', async function (next) {
    try {
        const user = this
        user.password = await bcrypt.hash(user.password, 8)
        next()
    } catch (error) {
        throw new Error(error.message)
    }

})

user.methods.toJSON = function () {
    const user = this
    const userObj = user.toObject()
    delete userObj.password
    return userObj
}

const User = mongoose.model('User', user)

module.exports = User
