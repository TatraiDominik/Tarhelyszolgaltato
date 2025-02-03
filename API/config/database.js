const { Sequelize } = require('sequelize');
const config = require('./config');

const db = new Sequelize(
    config.appDb.database,
    config.appDb.user,
    config.appDb.password,
    {
        host: config.appDb.host,
        dialect: 'mysql',
        logging: config.appDb.logging ? console.log : false
    }
);

module.exports = db;