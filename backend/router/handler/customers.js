import {Router,urlencoded} from 'express';
import bodyParser from 'body-parser';
import {StatusCodes,getStatusCode,ReasonPhrases} from 'http-status-codes';

import db from '../../db/index.js';
import {sendDataMessage,errorMessage} from '../../handler/responsStatusCode.js';


const app = Router();
app.use(urlencoded({extended : true}));
// untuk body di bagian raw
app.use(bodyParser({extended : true}));
const url_api = process.env.API_URL;

app.get(`/${url_api}/customers`,(req,res) => {
    let sql = `SELECT * FROM customers`;
    db.query(sql,(err,result) => {
        if(err){
            console.log(errorMessage(err));
            return sendDataMessage(
                res,
                StatusCodes.INTERNAL_SERVER_ERROR,
                ReasonPhrases.INTERNAL_SERVER_ERROR,
                errorMessage(err),
                false,
                {}
            )
        }
        if(result?.length > 0){
           return sendDataMessage(res,StatusCodes.OK,ReasonPhrases.OK,'Success',true,result);
        }else{
            return sendDataMessage(res,StatusCodes.NOT_FOUND,ReasonPhrases.NOT_FOUND,ReasonPhrases.NOT_FOUND,false,result);
        }
    });;
})

app.post(`/${url_api}/customers`,(req,res) => {
    const data = req.body;
    const {name,phone,address} = data;
    if(!name || !phone || !address){
        return sendDataMessage(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            ReasonPhrases.INTERNAL_SERVER_ERROR,
            "PLEASE FILL IN ALL COLUMNS!",
            false,
            {}
        )
    }
    let sql = `SELECT * FROM customers WHERE name = '${name}' `;
    db.query(sql,(error,result1) => {
        if(error){
            console.log(errorMessage(error));
            return sendDataMessage(
                res,
                StatusCodes.INTERNAL_SERVER_ERROR,
                ReasonPhrases.INTERNAL_SERVER_ERROR,
                errorMessage(err),
                false,
                {}
            )
        }
        if(result1.length == 0){
            sql = `INSERT INTO customers(name,phone,address) VALUES('${name}','${phone}','${address}')`;
            db.query(sql,(err,result) => {
                console.log(result);
                if(err) {
                    console.log(errorMessage(err));
                    return sendDataMessage(
                        res,
                        StatusCodes.INTERNAL_SERVER_ERROR,
                        ReasonPhrases.INTERNAL_SERVER_ERROR,
                        errorMessage(err),
                        false,
                        {}
                    )
                }
                if(result.affectedRows > 0){
                    return sendDataMessage(
                        res,
                        StatusCodes.OK,
                        ReasonPhrases.OK,
                        "Success",
                        true,
                        {name,phone,address}
                    )
                }else{
                    return sendDataMessage(
                        res,
                        StatusCodes.INTERNAL_SERVER_ERROR,
                        ReasonPhrases.INTERNAL_SERVER_ERROR,
                        `INTERNAL SERVER ERROR!!!`,
                        false,
                        {name,phone,address}
                    )
                }
            })
        }else{
            return sendDataMessage(
                res,
                StatusCodes.FORBIDDEN,
                ReasonPhrases.FORBIDDEN,
                `NAME WITH NAME ${name} IS EXIST IN DATABASE!`,
                false,
                {name,phone,address}
            )
        }
    })
})

app.put(`/${url_api}/customers`,(req,res) => {
    const data = req.body;
    const {id,name,phone,address} = data;

    if(!id){
        return sendDataMessage(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            ReasonPhrases.INTERNAL_SERVER_ERROR,
            "THERE IS NO ID AND NO ONE DATA WILL CHANGE",
            false,
            {}
        )
    }

    if(!name || !phone || !address){
        return sendDataMessage(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            ReasonPhrases.INTERNAL_SERVER_ERROR,
            "PLEASE FILL IN ALL COLUMNS!",
            false,
            {}
        )
    }

    let sql = `UPDATE customers SET name = '${name}', phone = '${phone}', address = '${address}' WHERE customer_id = ${id}`;
    db.query(sql,(err,result) => {
        if(err) {
            console.log(errorMessage(err));
            if(err.errno == 1062){
                return  sendDataMessage(
                    res,
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    ReasonPhrases.INTERNAL_SERVER_ERROR,
                    errorMessage(err).error.message.split('ER_DUP_ENTRY: ')[1].split(' for')[0],
                    false,
                    {}
                )
            }
            return sendDataMessage(
                res,
                StatusCodes.INTERNAL_SERVER_ERROR,
                ReasonPhrases.INTERNAL_SERVER_ERROR,
                errorMessage(err),
                false,
                {}
            )
        }

        if(result.affectedRows > 0){
            return sendDataMessage(
                res,
                StatusCodes.OK,
                ReasonPhrases.OK,
                "Success",
                true,
                {name,phone,address}
            )
        }else{
            return sendDataMessage(
                res,
                StatusCodes.NOT_FOUND,
                ReasonPhrases.NOT_FOUND,
                `ID WITH ${id} WAS NOT FOUND!`,
                false,
                {id}
            )
        }
    })
})


app.delete(`/${url_api}/customers`,(req,res) => {
    const data = req.body;
    const {id} = data;
    if(!id){
        return sendDataMessage(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            ReasonPhrases.INTERNAL_SERVER_ERROR,
            "THERE IS NO ID AND NO ONE DATA WILL CHANGE",
            false,
            {}
        )
    }
    let sql = `DELETE FROM customers WHERE customer_id = ${id}`;
    db.query(sql,(err,result) => {
        if(err) {
            console.log(errorMessage(err));
            return sendDataMessage(
                res,
                StatusCodes.INTERNAL_SERVER_ERROR,
                ReasonPhrases.INTERNAL_SERVER_ERROR,
                errorMessage(err),
                false,
                {}
            )
        }
        console.log(result);
        if(result.affectedRows > 0){
            return sendDataMessage(
                res,
                StatusCodes.OK,
                ReasonPhrases.OK,
                "Success",
                true,
                {id}
            )
        }else{
            return sendDataMessage(
                res,
                StatusCodes.NOT_FOUND,
                ReasonPhrases.NOT_FOUND,
                `ID WITH ${id} WAS NOT FOUND!`,
                false,
                {id}
            )
        }
    })
})

export default app;