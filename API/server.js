const express = require('express');
const app = express();
const cors = require('cors');
const config = require('./config/config');
const databaseRouter = require('./routes/database.router'); 
const userRouter = require('./routes/user.router');
const db = require('./config/database');

app.use(cors());
app.use(express.json()); // Ez a sor biztosítja, hogy a JSON törzs feldolgozásra kerüljön
app.use(express.urlencoded({ extended: true })); 
app.use('/api/database', databaseRouter);
app.use('/api/user', userRouter);  

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