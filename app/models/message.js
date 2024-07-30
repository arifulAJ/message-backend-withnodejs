const mongoose = require('mongoose');

const messageSchema=new mongoose.Schema({
    chatId:{ type: mongoose.Schema.ObjectId, ref: 'Chat', required: true },
    senderId:{ type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    reciverId:{ type: mongoose.Schema.ObjectId, ref: 'User', required: true },

    textMessage:{type:String,required:true},
    messageType:{type:String,enum:["text","image"]}

},{timestamps:true})

const Message=mongoose.model("Message",messageSchema)

module.exports=Message