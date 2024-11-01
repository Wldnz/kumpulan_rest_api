
import express from 'express';
import 'dotenv/config.js';

import db from './db/index.js'

const app = express();
const port = process.env.PORT;

import getData from './routes/getData.js'

db.connect();
app.use('/',getData);

app.get('/',(req,res) => {
    res.send('Hello World!');
})

app.listen(port,() => console.log(`SERVER RUNNING ON PORT ${port}\nLink : http://localhost:${port}`));

