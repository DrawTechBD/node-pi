const dotenv = require('dotenv');
dotenv.config();

class AppError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        this.message = message;

        Error.captureStackTrace(this, this.constructor);

    }

    static sendErrorDev = (err, res) => {
        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack,
        });
    };

    static sendErrorProd = (err, res) => {
        // Operational, trusted error: send message to client
        if(err.isOperational){
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
            });
        }
        // Programming or other unknown error
        else {
            // 1. Log error
            console.error('Error 💥: ', err);

            // 2. Send generic message
            res.status(500).json({
                status: 'error',
                message: 'Something went very wrong',
            });
        }

    };

    static middleware = (err, req, res, next) => {
        console.log("Used");
            err.statusCode = err.statusCode || 500;
            err.status = err.status || 'error';
            console.log(process.env.NODE_ENV);
            if(process.env.NODE_ENV === "development") {
                this.sendErrorDev(err, res);
            } else if(process.env.NODE_ENV === "production"){
                let error = {...err};
                if(error.name === 'CastError') error = this.handleCastErrorDB(error);
                if(error.code === 11000) error = this.handleDuplicateFieldsDB(error);
                if(error.name === "validationError")
                    error = this.handleValidationErrorDB(error);
                this.sendErrorProd(err, res);
            }
        };


    static handleCastErrorDB = err => {
        const message = `Invalid ${err.path}: ${err.value}`;
        return new AppError(message, 400);
    };

    static handleDuplicateFieldsDB = err => {
        const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
        const message = `Duplicate field value: ${value}. Please use another value!`;
        return new AppError(message, 400);
    }

    static handleValidationErrorDB = err => {
        const errors = Object.values(err.errors).map(el => el.message);

        const message = `Invalid input data. ${errors.join('. ')}`;
        return new AppError(message, 400);
    }
}

module.exports = AppError;