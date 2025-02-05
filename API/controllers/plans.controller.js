const plansService = require('../services/plans.service')

exports.addPlan = async (req, res, next) => {
    console.log('Headers:', req.headers);
    console.log('Request body:', req.body);

    try {
        const { name, price, description } = req.body;

        if (!name || price === undefined || !description) {
            return res.status(400).json({ message: 'Hiányzó adatok!' });
        }

        const plan = await plansService.addNewPlan(name, price, description);
        res.status(201).json(plan);
    } catch (error) {
        next(error);
    }
};
exports.getPlan = async (req, res, next) => {
    try {
        const plans = await plansService.getAllPlans();
        res.status(200).json({success: true, results: plans});
    } catch (error) {
        next(error);
    }
}