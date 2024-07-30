const Response = require("../../helpers/response");
const Message = require("../models/message");
const jwt = require("jsonwebtoken");


const createMessage=async(req,res)=>{
    try {
         // Get the token from the request headers
    const tokenWithBearer = req.headers.authorization;
    let token;

    if (tokenWithBearer && tokenWithBearer.startsWith('Bearer ')) {
        // Extract the token without the 'Bearer ' prefix
        token = tokenWithBearer.slice(7);
    }

    if (!token) {
        return res.status(401).json(Response({ statusCode: 401, message: 'Token is missing.', status: 'failed' }));
    }
    

 
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(decoded)
        const {id,textMessage,reciverId}=req.body

        const data={
            chatId:id,
            senderId:decoded._id,
            reciverId:reciverId,
            textMessage:textMessage,
            messageType:"text"
            
        }

        const message=await Message.create(data)

        return res.status(200).json(Response({ statusCode: 200, message: 'message created successfully.', status: 'success', data: message })); 





        
    } catch (error) {
        return res.status(500).json(Response({ statusCode: 500, message: error.message, status: 'server error ' }));

        
    }
}

const showMessageOfUser=async(req,res)=>{
    try {
         // Get the token from the request headers
    const tokenWithBearer = req.headers.authorization;
    let token;

    if (tokenWithBearer && tokenWithBearer.startsWith('Bearer ')) {
        // Extract the token without the 'Bearer ' prefix
        token = tokenWithBearer.slice(7);
    }

    if (!token) {
        return res.status(401).json(Response({ statusCode: 401, message: 'Token is missing.', status: 'failed' }));
    }
    

 
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userId = decoded._id;
       // Fetch messages where the user is either the sender or receiver
       const messages = await Message.find({
        $or: [
            { senderId: userId },
            { reciverId: userId }
        ]
    }) // Optional: Sort messages by creation date in descending order

    if(messages.length===0){
        return res.status(401).json(Response({ statusCode: 401, message: 'you don not have message yet.', status: 'failed' }));

        
    }
    return res.status(200).json(Response({ statusCode: 200, message: 'message created successfully.', status: 'success', data: messages })); 

    } catch (error) {
        return res.status(500).json(Response({ statusCode: 500, message: error.message, status: 'server error ' }));

        
    }
}

const editMessage=async(req,res)=>{
    try {
        // Get the token from the request headers
    const tokenWithBearer = req.headers.authorization;
    let token;

    if (tokenWithBearer && tokenWithBearer.startsWith('Bearer ')) {
        // Extract the token without the 'Bearer ' prefix
        token = tokenWithBearer.slice(7);
    }

    if (!token) {
        return res.status(401).json(Response({ statusCode: 401, message: 'Token is missing.', status: 'failed' }));
    }
    

 
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userId = decoded._id;
        
        const {id,text}=req.body
        const message=await Message.findById(id)
        
        if(message.senderId.toString()===userId){

            const updateMessage=await Message.findByIdAndUpdate(id,{textMessage:text},{new:true})
            return res.status(200).json(Response({ statusCode: 200, message: 'message updated  successfully.', status: 'success', data: updateMessage })); 

        }else{
            return res.status(401).json(Response({ statusCode: 401, message: 'this is not your message.', status: 'failed' }));
        }
      


        
    } catch (error) {
        return res.status(500).json(Response({ statusCode: 500, message: error.message, status: 'server error ' }));

        
    }
}
module.exports={
    createMessage,
    showMessageOfUser,
    editMessage
}