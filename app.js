require ('dotenv').config();

const express = require('express');
const app = express();
const sequelze = require('./db');
const coach = require('./controllers/coachcontroller');
const client = require('./controllers/clientcontroller');
const nutrition = require('./controllers/nutritioninfocontroller');
const message = require('./controllers/messagecontroller');

sequelze.sync();
app.use(express.json());
app.use(require('./middleware/headers'));

app.use('/coach', coach);
app.use('/client', client);
app.use('/nutrition', nutrition);
app.use('/message', message);



app.listen(process.env.PORT, () => console.log('app is listening'));