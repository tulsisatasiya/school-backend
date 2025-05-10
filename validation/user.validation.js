const Joi = require('joi');

// For admin or teacher registration
const generalRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('admin', 'teacher').required(),
  branch: Joi.string().required()
});

// For student registration
const studentRegisterSchema = Joi.object({
  userData: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
    password: Joi.string().min(6).required(),
    branch: Joi.string().required()
  }),
  profileData: Joi.object().required(),  // You can define specific rules if needed
  parentPhone: Joi.string().pattern(/^[0-9]{10}$/).required()
});

// For login
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

module.exports = {
  generalRegisterSchema,
  studentRegisterSchema,
  loginSchema
};
