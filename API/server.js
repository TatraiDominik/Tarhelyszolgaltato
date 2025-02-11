const express = require('express');
const app = express();
const cors = require('cors');
const config = require('./config/config');
const databaseRouter = require('./routes/database.router'); 
const userRouter = require('./routes/user.router');
const plansRouter = require('./routes/plans.router');
const subsRouter = require('./routes/subscription.router')
const db = require('./config/database');

require('./models/associations');

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use('/api/database', databaseRouter);
app.use('/api/user', userRouter);  
app.use('/api/plans', plansRouter);
app.use('/api/subscriptions', subsRouter)

db.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    return db.sync({ alter: config.appDb.alter, force: config.appDb.force });
  })
  .then(() => {
    console.log('Database synced successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

app.listen(config.port || 3000, () => {
  console.log(`Server running at http://localhost:${config.port || 3000}`);
});