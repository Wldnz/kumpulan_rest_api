
export const sendDataMessage = (res,statusCode,reasonPhrase,message,isSuccess,data) => {
    res.status(statusCode).json({
        status : reasonPhrase,
        message,
        isSuccess,
        data
    });
}

export const errorMessage = (error) => {
    let errMessage = {
        status : error.code,
        message : error.message,
        sql_query : error.sql,
        code : error.errno
    }
    // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errMessage);
    return {
        error : errMessage
    }
}
