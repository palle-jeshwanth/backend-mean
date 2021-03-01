const express = require('express')

const router = express.Router()

const User = require('../model/user')

router.post('/', async (req,res,next)=>{
   // console.log(req.body);

   let  user =  new User({...req.body})
   // console.log(user);
   try {  
   user = await user.save()
   if(!user){
     return res.send({
        status:'Failed',
        code:0,
        message:'User not added',
        data:null
     })
   }
   return res.send({
      status:'Success',
      code:1,
      message:'User added',
      data:user
   })
   } catch (error) {
      res.status(401).send(error.message)
   }

})

router.get('/',async (req,res,next)=>{
   try {
     const users = await User.find({})
      if(!users.length){
         return res.send({
            status:'Failed',
            code:0,
            message:'Users not found',
            data:[]
         }) 
      }
      return res.send({
         status:'Success',
         code:1,
         message:'Users fetched',
         data:users
      })
   } catch (error) {
      res.status(404).send(error.message)
   }
})

module.exports = router;