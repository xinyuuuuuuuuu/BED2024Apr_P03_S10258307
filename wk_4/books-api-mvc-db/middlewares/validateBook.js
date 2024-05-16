// Joi provides a flexible n user-friendly way to define validation rules for API endpoints
// middleware func named validateBook
// utilizes the Joi lib for schem-based validation of the request body
const Joi = require("joi");

/*
Schema obj: specify validation rules for the title and author properties
title must be a string w a minim length of 3 n a max length of 50 char
author must be a string w a minm length of 3 n a max length of 50 char
both properties are marked as required
*/ 

const validateBook = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().min(3).max(50).required(),
        author: Joi.string().min(3).max(50).required(),
    });

    const validation = schema.validate(req.body, { abortEarly: false });   
    // schema.validate - method that performs the validation agnst the req body
    // abortEarly: false - opt ensures that all validation errors are collected before spending a response 

    if (validation.error) {
        const errors = validation.error.details.map((error) => error.message);
        res.status(400).json({ message: "Validation error", errors});
        return; // terminate middleware execution on validation error
    }
    /*
    validation error occur, 
    errors are extracted n formatted into an array of msg, 
    a response w status code 400 (bad request) sent,
    containing a msg n the list of validation errors,
    return statem terminates further execution of the middleware
    */

    next(); // if validation passes, proceed to the next route handler
    /*
    validation successful, 
    next() is called, 
    allows reuest to proceed to the next route handler
    */
};

module.exports = validateBook;
