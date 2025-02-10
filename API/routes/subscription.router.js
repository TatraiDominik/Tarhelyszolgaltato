const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscription.controller');
const { authMiddleware } = require('../middleware/authenticate'); // Az általad írt middleware

// Előfizetés hozzáadása
router.post('/add', authMiddleware, subscriptionController.addSubscription);

// Előfizetés törlése
router.delete('/:id', authMiddleware, subscriptionController.deleteSubscription);

// Felhasználó összes előfizetése
router.get('/', authMiddleware, subscriptionController.getUserSubscriptions);

module.exports = router;
