const mongoose = require('mongoose');

const groupMessageSchema=new mongoose.Schema({
    groupId:{ type: mongoose.Schema.ObjectId, ref: 'GropuMemeber', required: true },
    chatId:{ type: mongoose.Schema.ObjectId, ref: 'Chat', required: true },

    messageSenderId:{ type: mongoose.Schema.ObjectId, ref: 'GropuMemeber', required: true },
    textMessage:{type:String,required:true},
    messageType:{type:String,enum:["text","image"]}
    

  

},{timestamps:true})

const GroupMessage=mongoose.model("GroupMessage",groupMessageSchema)

module.exports=GroupMessage