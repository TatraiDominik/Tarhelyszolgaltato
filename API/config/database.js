const db = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    {
        host: config.db.host,
        dialect: 'mysql',
        logging: (msg) => console.log(msg)
    }
);
