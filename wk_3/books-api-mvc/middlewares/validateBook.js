const Joi = require("joi");

const validateBook = (req, res, next) => {                // middleware that intercepts requests
    const schema = Joi.object({
        title: Joi.string().min(3).max(50).required(),
        author: Joi.string().min(3).max(50).required(),
    });

    const validation = schema.validate(req.body, { abortEarly: false }); // validate request body, validate funuction validates the request body agnst the schema
                                                                         // abortEarly: false -> ensures that all errors are collected and reported
    if (validation.error) {                                              // validation fail: below will happen
        const errors = validation.error.details.map((error) => error.message);
        res.status(400).json({ message: "Validation error", errors });
        return; // terminate middleware execution on validation error
    }

    next(); // if validation passes, proceed to the next route handler
};

module.exports = validateBook;
