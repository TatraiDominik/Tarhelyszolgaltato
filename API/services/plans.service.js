const { Plans } = require('../models/plans.model');

exports.addNewPlan = async (name, price, description) =>{
    const plan = await Plans.create({
        name,
        price,
        description
    });

    return plan;
}

exports.getAllPlans = async () =>{
    return await Plans.findAll();
}

exports.updatePlan = async (id, updatedData) => {
    const plan = await Plans.findOne({ where: { id } });
    if (!plan) throw new Error('Terv nem található!');

    
    const updatedPlan = await plan.update(updatedData);

    return {
        message: 'Terv sikeresen frissítve!',
        plan: {
            id: updatedPlan.id,
            name: updatedPlan.name,
            price: updatedPlan.price,
            description: updatedPlan.description
        }
    };
};


exports.deletePlan = async (id) => {
    const plan = await Plans.findOne({ where: { id } });
    if (!plan) throw new Error('Terv nem található!');

    
    await plan.destroy();

    return {
        message: 'Terv sikeresen törölve!'
    };
};