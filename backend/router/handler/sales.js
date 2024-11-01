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

app.get(`/${url_api}/sales`,(req,res) => {
    let sql = `SELECT * FROM sales`;
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

app.get(`/${url_api}/detail-sales`,(req,res) => {
    let sql = `SELECT 
	sales.sale_id,
    sales.customer_id,
    customers.name,
    sales.fish_id,
    fish.fish_name,
    sales.quantity_kg,
    sales.sale_date
    FROM sales 
    JOIN customers 
        on sales.customer_id = customers.customer_id
    JOIN fish
	on sales.fish_id = fish.fish_id;`;
    db.query(sql,(err,result) => {
        if(err){
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



app.post(`/${url_api}/sales`,(req,res) => {
    const data = req.body;
    const {customer_id,fish_id,quantity} = data;
    if(!customer_id || !fish_id || !quantity){
        return sendDataMessage(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            ReasonPhrases.INTERNAL_SERVER_ERROR,
            "PLEASE FILL IN ALL COLUMNS!",
            false,
            {}
        )
    }
    let sql = `INSERT INTO sales(customer_id,fish_id,quantity_kg,sale_date) VALUES('${customer_id}','${fish_id}','${quantity}',now())`;
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
                {customer_id,fish_id,quantity}
            )
        }else{
            return sendDataMessage(
                res,
                StatusCodes.INTERNAL_SERVER_ERROR,
                ReasonPhrases.INTERNAL_SERVER_ERROR,
                `INTERNAL SERVER ERROR!!!`,
                false,
                {customer_id,fish_id,quantity}
            )
        }
    })
})

app.put(`/${url_api}/sales`,(req,res) => {
    const data = req.body;
    const {id,customer_id,fish_id,quantity} = data;

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

    if(!customer_id || !fish_id || !quantity){
        return sendDataMessage(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            ReasonPhrases.INTERNAL_SERVER_ERROR,
            "PLEASE FILL IN ALL COLUMNS!",
            false,
            {}
        )
    }

    let sql = `UPDATE sales SET customer_id = '${customer_id}', fish_id = '${fish_id}', quantity_kg = '${quantity}' WHERE sale_id = ${id}`;
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
        };

        if(result.affectedRows > 0){
            return sendDataMessage(
                res,
                StatusCodes.OK,
                ReasonPhrases.OK,
                "Success",
                true,
                {customer_id,fish_id,quantity}
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


app.delete(`/${url_api}/sales`,(req,res) => {
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
    let sql = `DELETE FROM sales WHERE sale_id = ${id}`;
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