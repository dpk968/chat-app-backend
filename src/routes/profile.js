const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/profile', authMiddleware.verifyToken, profileController.getProfile);
router.put('/profile', authMiddleware.verifyToken, profileController.updateProfile);
router.delete('/profile', authMiddleware.verifyToken, profileController.deleteProfile);

module.exports = router;
