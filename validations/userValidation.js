const Joi = require('joi');

// Define the validation schema with joi
const validateUser = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const validateUserCredentials = (user) => {
    if (!user.password) {
        throw new Error("Password is empty")
    }
};

module.exports = { validateUser, validateUserCredentials };