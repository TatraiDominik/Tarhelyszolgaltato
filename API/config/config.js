require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    db: {
        host: process.env.DBHOST,
        user: process.env.DBUSER,
        password: process.env.DBPASS,
        database: process.env.DBNAME,
        force: process.env.FORCE === 'true' ? true : false,
        logging: process.env.LOGGING === 'true' ? true : false,
        alter: process.env.ALTER === 'true' ? true : false,
    },
    jwtSecret: process.env.JWT_SECRET
};