const { createServer } = require('node:http');
const { Server } = require('socket.io');

const { connectToDatabase } = require('../../config/database');
const app = require('../../server');
const Message = require('../models/message');


const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*'
    }
});


// Connect to the MongoDB database
connectToDatabase();




const socketIO = (io) => {
    console.log("Socket server is listening on port 4000");

    io.on('connection', async(socket) => {
        console.log(`New client connected`);
         
  

    socket.on('message',async(data) =>{
        const {text,chatId,receiverId,sendId}=data
       

        const message={
            chatId:chatId,
            senderId:sendId,
            reciverId:receiverId,
            textMessage:text,
            messageType:"text"


        }
        const createMessage= await Message.create(message)
     
        const meeageEvent =`sendMessage::${chatId}`       
        io.emit(meeageEvent,{message:createMessage} );

        socket.emit('test2',{"name":"hello",data})
    })
      
io.on('test',async(data)=>{
    console.log(data)
    socket.emit('test',{"name":"hello",data})

})

        socket.on('disconnect', async() => {
            console.log("you are disconnect")
            
        });


    });
}



module.exports = socketIO;
