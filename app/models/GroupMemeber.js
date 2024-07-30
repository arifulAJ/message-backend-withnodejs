const mongoose = require('mongoose');

const groupMessageSchema=new mongoose.Schema({
    admin:{ type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    member:[{ type: mongoose.Schema.ObjectId, ref: 'User', required: true }],
    groupName:{type:String,required:true}
    

  

},{timestamps:true})

const GroupMemeber=mongoose.model("GroupMemeber",groupMessageSchema)

module.exports=GroupMemeber