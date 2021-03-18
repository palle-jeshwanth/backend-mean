const Jwt = require('jsonwebtoken')

const User = require('../model/user')

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.replace('Bearer ', '')
        const decoded = Jwt.verify(token, 'Bhanu@8247065499')
        const query = {
            '_id': decoded.id,
            'Tokens.token': token
        }
        const user = await User.findOne(query)
        if (!user) {
            throw Error()
        }
        req.user = user 
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({
            status: "failure",
            code: 0,
            data: null,
            message: 'Please authenticate'
        })
    }
}
module.exports = verifyToken;