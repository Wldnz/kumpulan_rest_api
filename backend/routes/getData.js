
import {Router} from 'express';
import {StatusCodes,getStatusCode,ReasonPhrases} from 'http-status-codes';

import db from '../db/index.js'
import {sendDataMessage,errorMessage} from '../handler/responsStatusCode.js';


const app = Router();

const url_api = process.env.API_URL;

app.get(`/${url_api}/fish`,(req,res) => {
    let sql = `SELECT * FROM FISH`;
    db.query(sql,(err,result) => {
        if(err){
            return console.log(errorMessage(err,res));
        }
        if(result?.length > 0){
           return sendDataMessage(res,StatusCodes.OK,ReasonPhrases.OK,'Success',true,result);
        }else{
            return sendDataMessage(res,StatusCodes.NOT_FOUND,ReasonPhrases.NOT_FOUND,ReasonPhrases.NOT_FOUND,false,result);
        }
    });
})

app.get(`/${url_api}/customers`,(req,res) => {
    let sql = `SELECT * FROM customers`;

    db.query(sql,(err,result) => {
        db.query(sql,(err,result) => {
            if(err){
                return console.log(errorMessage(err,res));
            }

            if(result?.length > 0){
               return sendDataMessage(res,StatusCodes.OK,ReasonPhrases.OK,'Success',true,result);
            }else{
                return sendDataMessage(res,StatusCodes.NOT_FOUND,ReasonPhrases.NOT_FOUND,ReasonPhrases.NOT_FOUND,false,result);
            }
        });
    })
})

app.get(`/${url_api}/sales`,(req,res) => {
    let sql = `SELECT * FROM sales`;

    db.query(sql,(err,result) => {
        if(err){
            return console.log(errorMessage(err,res));
        }
        if(result?.length > 0){
           return sendDataMessage(res,StatusCodes.OK,ReasonPhrases.OK,'Success',true,result);
        }else{
            return sendDataMessage(res,StatusCodes.NOT_FOUND,ReasonPhrases.NOT_FOUND,ReasonPhrases.NOT_FOUND,false,result);
        }
    });
})

app.get(`/${url_api}/detail-sales`,(req,res) => {
    let sql = `SELECT * FROM sales`;

    db.query(sql,(err,result) => {
        if(err){
            return console.log(errorMessage(err,res));
        }
        if(result?.length > 0){
           return sendDataMessage(res,StatusCodes.OK,ReasonPhrases.OK,'Success',true,result);
        }else{
            return sendDataMessage(res,StatusCodes.NOT_FOUND,ReasonPhrases.NOT_FOUND,ReasonPhrases.NOT_FOUND,false,result);
        }
    });
})




export default app;