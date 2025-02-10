const { User } = require('./user.model');
const { Plans } = require('./plans.model');
const { Subscription } = require('./subscription.model');


User.belongsToMany(Plans, { through: Subscription, foreignKey: 'userId' });
Plans.belongsToMany(User, { through: Subscription, foreignKey: 'planId' });

module.exports = { User, Plans, Subscription };