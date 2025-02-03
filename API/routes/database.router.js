// routes/database.router.js

const express = require('express');
const router = express.Router();
const databaseController = require('../controllers/database.controller');

// Létrehozza az adatbázist
router.post('/create-database', databaseController.createDatabase);

// Létrehozza a felhasználót
router.post('/create-user', databaseController.createUser);

// Jogosultságok hozzárendelése a felhasználóhoz
router.post('/grant-privileges', databaseController.grantPrivileges);

module.exports = router;
