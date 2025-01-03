import express from 'express';
import cors from 'cors';

import db from './config/index.js';
const app =  express();
const port = 3000;
const status = 'Public';

app.use(cors());

app.get('/',(req,res) => {
    res.send(`Welcome To Wldnz API ${status}`);
});

app.get('/projects',async(req,res) => {
    try{
        console.log("Success Get Data!");
        const data = await db.model('projects').find({});
        res.status(200).json(data);
    }catch(error){
        console.log("error when Get Data!");
    }
});

app.listen(port,() => console.log(`server running on port : ${port}`));