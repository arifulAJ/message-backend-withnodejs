const Response = require("../../helpers/response");
const jwt = require("jsonwebtoken");


const GroupMessage = require("../models/GroupMessage");
const GroupMemeber = require("../models/GroupMemeber");
const Chat = require("../models/Chat");

 

const createGroup = async (req, res) => {
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

        // Extract members and groupName from the request body
        const { members, groupName } = req.body;

        // Validate members and groupName
        if (!members || !Array.isArray(members) || members.length === 0 || !groupName) {
            return res.status(400).json({ statusCode: 400, message: 'Members and groupName are required and must be non-empty.' });
        }
        // Check if a group with the same groupName already exists
        const existingGroup = await GroupMemeber.findOne({ groupName });

        if (existingGroup) {
            return res.status(400).json({ statusCode: 400, message: 'Group with this name already exists.' });
        }
        // Create data object for GroupMessage creation
        const data = {
            admin: userId,
            member: members, // Assuming members is an array of user IDs
            groupName: groupName
        };

        const createChat=await Chat.create({first:userId,member:members})
        // Create a new GroupMessage instance
        const groupMessage = await GroupMemeber.create(data);

        // Respond with success message and data
        return res.status(200).json(Response({ statusCode: 200, message: 'Group created successfully.', status: 'success', data: groupMessage }));

    } catch (error) {
        // Handle errors
        return res.status(500).json(Response({ statusCode: 500, message: error.message, status: 'server error' }));
    }
};


const sendMessageInGroup=async(req,res)=>{
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

         const {groupId,textMessage,chatId}=req.body

         const  data ={
            messageSenderId:userId,
            chatId:chatId,
            groupId:groupId,
            textMessage:textMessage,
            messageType:"text"




         }
         const message=await GroupMessage.create(data)

         return res.status(200).json(Response({ statusCode: 200, message: 'send message successfully.', status: 'success', data: message }));


 
        
    } catch (error) {
        return res.status(500).json(Response({statuseCode:500,message:error.message,status:"server error"}))
        
    }
}


const showGroupMessage=async(req,res)=>{
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

         const {groupId}=req.body
          
         const findMessage=await GroupMessage.find({groupId:groupId})

         return res.status(200).json(Response({ statusCode: 200, message: ' message show  successfully.', status: 'success', data: findMessage }));

        
    } catch (error) {
        return res.status(500).json(Response({statuseCode:500,message:error.message,status:"server error"}))

        
    }
}



 module.exports={
    createGroup,
    sendMessageInGroup,
    showGroupMessage
 }