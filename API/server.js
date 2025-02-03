const express = require('express');
const app = express();
const cors = require('cors');
const config = require('./config/config');
const databaseRouter = require('./routes/database.router'); 
const db = require('./config/database');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/database', databaseRouter);


db.sync({alter: config.db.alter, force: config.db.force})
    .then(()=>{
        console.log(`Database synced successfully.`);
    })
    .catch((err)=>{
        console.log(`Database sync error: ` + err);
    });


app.listen(3000, () => {
    console.log(`Server running at http://localhost:3000`);
});
