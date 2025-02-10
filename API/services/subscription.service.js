const { Subscription } = require('../models/subscription.model');
const { User } = require('../models/user.model');
const { Plans } = require('../models/plans.model');

// Előfizetés hozzáadása a felhasználóhoz
exports.addSubscription = async (userId, planId) => {
    // Ellenőrizzük, hogy a felhasználó létezik-e
    const user = await User.findByPk(userId);
    if (!user) throw new Error('Felhasználó nem található!');

    // Ellenőrizzük, hogy a plan létezik-e
    const plan = await Plans.findByPk(planId);
    if (!plan) throw new Error('Előfizetés nem található!');

    // Új előfizetés létrehozása
    const subscription = await Subscription.create({
        userId,
        planId,
        startDate: new Date(),  // A kezdési dátum a mostani időpont
    });

    return subscription;
};

// Előfizetés törlése
exports.deleteSubscription = async (subscriptionId) => {
    const subscription = await Subscription.findByPk(subscriptionId);
    if (!subscription) throw new Error('Előfizetés nem található!');
    
    await subscription.destroy();
    return { message: 'Előfizetés sikeresen törölve.' };
};

// Előfizetések lekérése felhasználó alapján
exports.getUserSubscriptions = async (userId) => {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('Felhasználó nem található!');
    
    const subscriptions = await Subscription.findAll({
        where: { userId },
        include: [{ model: Plans }]  // A kapcsolódó plan adatokat is lekérjük
    });

    return subscriptions;
};
