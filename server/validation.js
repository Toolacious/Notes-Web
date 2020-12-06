// Validation
const Joi = require("@hapi/joi");

//Register Validate
const registerValidate = (data) => {
    const schema = {
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    };
    return Joi.validate(data, schema);
};

//Login Validate
const loginValidate = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    });
    return Joi.validate(data, schema);
};

module.exports.registerValidate = registerValidate;
module.exports.loginValidate = loginValidate;
