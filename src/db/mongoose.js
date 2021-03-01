const mongoose = require('mongoose')
// I1T9r5JP1MRg6CDg

const uri = 'mongodb+srv://bhanu:I1T9r5JP1MRg6CDg@cluster0.vg4ew.mongodb.net/task-manager?retryWrites=true&w=majority'
mongoose.connect(uri,(res,error)=>{
    if(!error){
        console.log('connected');
    }
    console.log(res);
})

module.exports = mongoose;