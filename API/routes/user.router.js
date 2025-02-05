const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

/**
 * USER modul útvonalai
 */

// register new user
router.post('/register', userController.register);

// login user
router.post('/login', userController.login);

// get all users
router.get('/', authMiddleware,  userController.getAllUsers);

// get user by id
router.get('/:id', authMiddleware);

// get logged user profile
router.get('/profile', authMiddleware);

// update user
router.patch('/:id', authMiddleware, userController.updateUser);

// delete user
router.delete('/:id', authMiddleware,  userController.deleteUser);

module.exports = router;