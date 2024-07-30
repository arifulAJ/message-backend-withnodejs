const mongoose = require('mongoose');

const chatSechema=new mongoose.Schema({

    first:{ type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    second:{ type: mongoose.Schema.ObjectId, ref: 'User', required: false },
    member:[{ type: mongoose.Schema.ObjectId, ref: 'User', required: false }],

},{
    timestamps:true
})
const Chat=mongoose.model("Chat",chatSechema)

module.exports=Chat