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
    },
    Tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})

user.methods.generateToken = async function () {
    try {
        const user = this;
        const token = jwt.sign({ id: user._id }, "Bhanu@8247065499")
        user.Tokens = user.Tokens.concat({ token})
        await user.save()
        return token;
    } catch (error) {
        throw new Error(error)
    }
}



user.pre('save', async function (next) {
    try {
        const user = this
        if(user.isModified('password')){
            user.password = await bcrypt.hash(user.password, 8)
        }
        next()
    } catch (error) {
        throw new Error(error.message)
    }

})

user.methods.toJSON = function () {
    const user = this
    const userObj = user.toObject()
    delete userObj.password
    delete userObj.Tokens
    return userObj
}

const User = mongoose.model('User', user)

module.exports = User
