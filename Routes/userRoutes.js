// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');
const {  requireAuth } = require('../Middleware/authMiddleware');


router.post('/register', userController.register);
router.post('/login', userController.login);
// Get user by ID
router.get('/:id',   userController.getUserById);

// Update user
router.put('/:id', requireAuth, userController.updateUser);

// Delete user
router.delete('/:id', userController.deleteUser);



module.exports = router;
