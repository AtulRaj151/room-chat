const express = require('express');
const chatRoomController = require('../../../controllers/chatRoom');
const router = express.Router();

router.get('/', chatRoomController.getRecentConversation)
router.get('/:roomId', chatRoomController.getConversationByRoomId)
router.post('/initiate', chatRoomController.initiate)
router.post('/:roomId/message', chatRoomController.postMessage)
router.put('/:roomId/mark-read', chatRoomController.markConversationReadByRoomId)

module.exports = router;