const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
console.log('User Controller:', userController);
const { authMiddleware } = require('../middlewares/auth.middleware');

// User modul útvonalai

// Regisztráció
router.post('/register', userController.register);

// Belépés
router.post('/login', userController.login);

// Felhasználók listája (admin)
router.get('/', authMiddleware, userController.getAllUsers);

// Felhasználó adatainak lekérése
router.get('/profile', authMiddleware, userController.getProfile);

// Felhasználó adatainak frissítése
router.patch('/:id', authMiddleware, userController.updateUser);

// Felhasználó törlése
router.delete('/:id', authMiddleware, userController.deleteUser);

module.exports = router;
