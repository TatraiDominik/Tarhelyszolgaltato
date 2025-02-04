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
    return await Plans.findAll({
        attributes: {exclude:['id']}
    });
}