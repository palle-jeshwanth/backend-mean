const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const verifyToken = require('../middleware/auth')
const User = require('../model/user')

router.post('/', async (req, res, next) => {
   let user = new User({ ...req.body })
   try {
      user = await user.save()
      if (!user) {
         return res.send({
            status: 'Failed',
            code: 0,
            message: 'User not added',
            data: null
         })
      }
      return res.send({
         status: 'Success',
         code: 1,
         message: 'User added',
         data: user
      })
   } catch (error) {
      res.status(401).send(error.message)
   }

})

router.get('/', verifyToken, async (req, res, next) => {
   try {
      const users = await User.find({})
      if (!users.length) {
         return res.send({
            status: 'Failed',
            code: 0,
            message: 'Users not found',
            data: []
         })
      }
      return res.send({
         status: 'Success',
         code: 1,
         message: 'Users fetched',
         data: users
      })
   } catch (error) {
      res.status(404).send(error.message)
   }
})

router.post('/login', async (req, res, next) => {
   try {
      const user = await User.findOne({ email: req.body.email })
      if (!user) {
         return res.send({
            status: 'failure',
            code: 0,
            data: user,
            message: 'Email does not exists please create one '
         })
      }
      const isMatched = await bcrypt.compare(req.body.password, user.password)
      if (!isMatched) {
         return res.send({
            status: 'Failure',
            code: 0,
            data: null,
            message: 'Incorrect Password'
         })
      }
      const token = await user.generateToken()
      res.send({
         status: 'Success',
         code: 1,
         data: token,
         message: 'Login Successful'
      })
   } catch (error) {

   }

})


router.post('/register', async (req, res, next) => {
   try {
      let user = await User.findOne({ email: req.body.email })
      if (user) {
         return res.send({
            status: 'failure',
            code: 0,
            data: null,
            message: 'Email already exists please login '
         })
      }
      user = new User({ ...req.body })
      user = await user.save()
      if (!user) {
         return res.status(404)
      }
      res.send({
         status: 'success',
         code: 1,
         data: user,
         message: 'User Registered Successfully'
      })
   }
   catch (error) {

   }

})

router.delete('/:id', async (req, res, next) => {
   try {
      const user = await User.findByIdAndDelete({ _id: req.params.id })
      if (!user) {
         return res.send({
            status: "failure",
            code: 0,
            data: null,
            message: "user not found"
         })
      }
      return res.send({
         status: "success",
         code: 1,
         data: user,
         message: "user deleted successfully"
      })
   } catch (error) {
      res.status(500).send('Internal server error')
   }
})

router.post('/verify', async (req, res, next) => {
   try {
      console.log();
      const user = await User.findOne({ email: req.body.email })
      if (!user) {
         return res.send({
            status: 'failure',
            code: 0,
            data: user,
            message: 'Email does not exists please create one '
         })

      }
      res.send({
         status: 'success',
         code: 1,
         data: user,
         message: 'Email exists'
      })
   } catch (error) {

   }

})

router.post('/changePassword', async (req, res, next) => {
   try {
      let user = await User.findOneAndUpdate({ email: req.body.email }, { password: req.body.password }, { new: true })
      if (!user) {
         return res.send({
            status: 'failuer',
            code: 0,
            data: null,
            message: "User not found"
         })
      }
      // user.password = req.body.password
      // console.log(user)
      user = await user.save()
      res.send({
         status: 'Success',
         code: 1,
         data: user,
         message: "Password Updated successfully"
      })
   } catch (error) {

   }
})

router.post('/resetpassword', verifyToken, async (req, res, next) => {
   try {
      const isMatched = await bcrypt.compare(req.body.oldPassword, req.user.password)
      if (!isMatched) {
         return res.send({
            status: 'Failure',
            code: 0,
            data: null,
            message: 'Old Password is Incorrect'
         })
      }
      req.user.password = req.body.newPassword
      await req.user.save()
      res.send({
         status: 'Success',
         code: 1,
         data: null,
         message: 'Password Changed'
      })
   } catch (error) {

   }
})

router.post('/logoutAll',verifyToken,async(req,res,next)=>{
   try {
      req.user.Tokens = []
      await req.user.save()
      res.send({
         status:'Success',
         code:1,
         data:null,
         message:'LogedOut from all devices'
      })
   } catch (error) {
      
   }
   
})

router.post('/logout',verifyToken,async(req,res,next)=>{
   try {
      req.user.Tokens = req.user.Tokens.filter((token)=>{
         return token.token != req.token 
      })
      await req.user.save()
      res.send({
         status:'Success',
         code:1,
         data:null,
         message:'LogedOut'
      })
   } catch (error) {
      
   }
   
})

module.exports = router;