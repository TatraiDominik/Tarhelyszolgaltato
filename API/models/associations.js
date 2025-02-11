const { User } = require('./user.model');
const { Plans } = require('./plans.model');
const { Subscription } = require('./subscription.model');
const { DataTypes } = require('sequelize');

// Kapcsolatok létrehozása
User.belongsToMany(Plans, { 
    through: Subscription, 
    foreignKey: { 
        name: 'userId', 
        type: DataTypes.UUID, 
        allowNull: false 
    }
});

Plans.belongsToMany(User, { 
    through: Subscription, 
    foreignKey: { 
        name: 'planId', 
        type: DataTypes.UUID, 
        allowNull: false 
    }
});


Subscription.belongsTo(User, { foreignKey: 'userId' });
Subscription.belongsTo(Plans, { foreignKey: 'planId' });

module.exports = { User, Plans, Subscription };
