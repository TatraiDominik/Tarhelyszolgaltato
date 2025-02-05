const express = require('express');
const router = express.Router();
const {authMiddleware} = require('../middlewares/auth.middleware')
const planController = require('../controllers/plans.controller');

router.post('/addPlan', planController.addPlan);
router.get('/getPlans', planController.getPlan);
router.patch('/:id', authMiddleware, planController.updatePlan);
router.delete('/:id', authMiddleware, planController.deletePlan);
module.exports = router;
