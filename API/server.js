const express = require('express');
const app = express();
const cors = require('cors');
const config = require('./config/config');
const databaseRouter = require('./routes/database.router'); 
const db = require('./config/database');

// Middleware
app.use(cors());
app.use(express.json()); // This is crucial for parsing JSON request bodies
app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded bodies
app.use('/api/database', databaseRouter);

// Database sync
db.sync({ alter: config.db.alter, force: config.db.force })
    .then(() => {
        console.log(`Database synced successfully.`);
    })
    .catch((err) => {
        console.log(`Database sync error: ` + err);
    });

// Start server
app.listen(3000, () => {
    console.log(`Server running at http://localhost:3000`);
});