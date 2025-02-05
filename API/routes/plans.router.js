const express = require('express');
const router = express.Router();
const planController = require('../controllers/plans.controller');

router.post('/addPlan', planController.addPlan);
router.get('/getPlans', planController.getPlan);

module.exports = router;
