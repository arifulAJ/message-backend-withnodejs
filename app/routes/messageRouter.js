const express = require('express');

const router = express.Router();
const { createChat, showChat } = require('../controllers/chatController');
const { createMessage, showMessageOfUser, editMessage } = require('../controllers/messageController');
const { createGroup, sendMessageInGroup, showGroupMessage } = require('../controllers/groupMessageController');



// chat 
router.post('/createChat',createChat)

// message
router.post('/createMessage',createMessage)
router.get('/showMessageOfUser',showMessageOfUser)
router.patch('/editMessage',editMessage)
// group chat
router.post('/createGroup',createGroup)
router.get('/showChat',showChat)
// group message
router.post('/sendMessageInGroup',sendMessageInGroup)
router.get('/showGroupMessage',showGroupMessage)

module.exports = router;