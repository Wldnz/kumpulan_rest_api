
import express from 'express';
import 'dotenv/config.js';
import cors from 'cors';
import mainRoute from './router/index.js'

const app = express();
const port = process.env.PORT;


app.use('/',mainRoute)
// this api will gonna accept all the request such ip address,host,or anything
app.use(cors());

app.get('/',(req,res) => {
    res.send('Hello World!');
})

app.listen(port,() => console.log(`SERVER RUNNING ON PORT ${port}\nLink : http://localhost:${port}`));

