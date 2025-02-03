require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    plainDb: {
        host: process.env.DBHOST,
        user: process.env.DBUSER,
        password: process.env.DBPASS,
        database: process.env.DBNAME,
        force: process.env.FORCE === 'true',
        logging: process.env.LOGGING === 'true',
        alter: process.env.ALTER === 'true',
    },
    appDb: {
        host: process.env.APPDBHOST,
        user: process.env.APPDBUSER,
        password: process.env.APPDBPASS,
        database: process.env.APPDBNAME,
        force: process.env.FORCE === 'true',
        logging: process.env.LOGGING === 'true',
        alter: process.env.ALTER === 'true',
    },
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret'
};