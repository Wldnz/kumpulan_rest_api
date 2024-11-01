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

app.get(`/${url_api}/fish`,(req,res) => {
    let sql = `SELECT * FROM FISH`;
    db.query(sql,(err,result) => {
        if(err){
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
        if(result?.length > 0){
           return sendDataMessage(res,StatusCodes.OK,ReasonPhrases.OK,'Success',true,result);
        }else{
            return sendDataMessage(res,StatusCodes.NOT_FOUND,ReasonPhrases.NOT_FOUND,ReasonPhrases.NOT_FOUND,false,result);
        }
    });;
})


app.post(`/${url_api}/fish`,(req,res) => {
    const data = req.body;
    const {name,price,stock,image_url} = data;
    if(!name || !price || !stock){
        return sendDataMessage(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            ReasonPhrases.INTERNAL_SERVER_ERROR,
            "PLEASE FILL IN ALL COLUMNS!",
            false,
            {}
        )
    }
    let sql = `SELECT * FROM FISH WHERE FISH_NAME = '${name}' `;
    db.query(sql,(error,result1) => {
        if(error) {
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
            sql = `INSERT INTO fish(fish_name,price_per_kg,stock_kg,image_url) VALUES('${name}','${price}','${stock}','${image_url}')`;
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
                        {name,price,stock,image_url}
                    )
                }else{
                    return sendDataMessage(
                        res,
                        StatusCodes.INTERNAL_SERVER_ERROR,
                        ReasonPhrases.INTERNAL_SERVER_ERROR,
                        `INTERNAL SERVER ERROR!!!`,
                        false,
                        {name,price,stock,image_url}
                    )
                }
            })
        }else{
            return sendDataMessage(
                res,
                StatusCodes.FORBIDDEN,
                ReasonPhrases.FORBIDDEN,
                `FISH WITH NAME ${name} IS EXIST IN DATABASE!`,
                false,
                {name,price,stock,image_url}
            )
        }
    })
})

app.put(`/${url_api}/fish`,(req,res) => {
    const data = req.body;
    const {id,name,price,stock,image_url} = data;

    if(!id){
        return sendDataMessage(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            ReasonPhrases.INTERNAL_SERVER_ERROR,
            "THERE IS NO ID AND NO ONE DATA IS CHANGE",
            false,
            {}
        )
    }

    if(!name || !price || !stock){
        return sendDataMessage(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            ReasonPhrases.INTERNAL_SERVER_ERROR,
            "PLEASE FILL IN ALL COLUMNS!",
            false,
            {}
        )
    }

    let sql = `UPDATE FISH SET fish_name = '${name}', price_per_kg = '${price}', stock_kg = '${stock}', image_url = '${image_url}' WHERE fish_id = ${id}`;
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
                {id,name,price,stock,image_url}
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


app.delete(`/${url_api}/fish`,(req,res) => {
    const data = req.body;
    const {id} = data;
    if(!id){
        return sendDataMessage(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            ReasonPhrases.INTERNAL_SERVER_ERROR,
            "THERE IS NO ID AND NO ONE DATA IS CHANGE",
            false,
            {}
        )
    }
    let sql = `DELETE FROM FISH WHERE fish_id = ${id}`;
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