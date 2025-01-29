

const express = require('express');
const app = express();
const databaseRouter = require('./routes/database.router'); 

app.use(express.json());  


app.use('/api/database', databaseRouter);


app.listen(3000, () => {
    console.log(`Server running at http://localhost:3000`);
});
