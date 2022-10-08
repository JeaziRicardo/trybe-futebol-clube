import * as Joi from 'joi';

const message = '400|All fields must be filled';

const login = Joi.object({
  email: Joi.string().email().messages({
    'any.required': message,
    'string.empty': message,
  }).required(),

  password: Joi.string().min(7).messages({
    'any.required': message,
    'string.empty': message,
  }).required(),
});

export default {
  login,
};
