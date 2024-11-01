
import express from 'express';
import 'dotenv/config.js';

import mainRoute from './router/index.js'

const app = express();
const port = process.env.PORT;


app.use('/',mainRoute)
app.get('/',(req,res) => {
    res.send('Hello World!');
})

app.listen(port,() => console.log(`SERVER RUNNING ON PORT ${port}\nLink : http://localhost:${port}`));

