// Validation
const Joi = require("@hapi/joi");

//Register Validate
export const registerValidate = (data) => {
    const schema = {
        fname: Joi.string().max(50).required(),
        lname: Joi.string().max(50).required(),
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    };
    return Joi.validate(data, schema);
};

//Login Validate
export const loginValidate = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    });
    return Joi.validate(data, schema);
};
