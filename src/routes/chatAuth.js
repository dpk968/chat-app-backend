const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const chatController = require('../controllers/chatController');


router.post('/chat', authMiddleware.verifyToken, chatController.sendMessage);

module.exports = router;