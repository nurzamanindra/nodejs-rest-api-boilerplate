const ErrorResponse = require('../utils/ErrorResponse');

const errorHandler = (err, req, res, next) => {
    let error = { ...err };
 
    error.message = err.message;

    //log to console 
    console.log(JSON.parse(JSON.stringify(err)));
    // console.log(err.stack);

      // Mongoose bad ObjectId
   if (err.name === 'CastError') {
        const message = `Data not found with id of ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

     // Mongoose duplicate key
   if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(message, 400);
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400);
    }


    res.status(error.statusCode || 500)
        .json({
            sucess: false,
            message: error.message
        });

};

module.exports = errorHandler;