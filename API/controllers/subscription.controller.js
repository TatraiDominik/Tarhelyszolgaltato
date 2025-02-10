const subscriptionService = require('../services/subscription.service');

// Előfizetés hozzáadása a felhasználóhoz
exports.addSubscription = async (req, res, next) => {
    try {
        const { userId, planId } = req.body;
        if (!userId || !planId) {
            return res.status(400).json({ message: 'Hiányzó adatok!' });
        }

        const subscription = await subscriptionService.addSubscription(userId, planId);
        res.status(201).json({
            message: 'Előfizetés sikeresen hozzáadva!',
            subscription
        });
    } catch (error) {
        next(error);
    }
};

// Előfizetés törlése
exports.deleteSubscription = async (req, res, next) => {
    try {
        const subscriptionId = req.params.id;
        if (!subscriptionId) {
            return res.status(400).json({ message: 'Hiányzó előfizetés ID!' });
        }

        const result = await subscriptionService.deleteSubscription(subscriptionId);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

// Felhasználó összes előfizetése
exports.getUserSubscriptions = async (req, res, next) => {
    try {
        const userId = req.user.id; // A tokenből kiolvasott user ID
        const subscriptions = await subscriptionService.getUserSubscriptions(userId);
        res.status(200).json(subscriptions);
    } catch (error) {
        next(error);
    }
};
