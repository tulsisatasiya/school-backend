const Joi = require("joi");

const branchValidationSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  city: Joi.string().min(2).max(100).required(),
  address: Joi.string().optional().allow(""),
  contactNumber: Joi.string().pattern(/^[0-9]{10,15}$/).optional(),
  email: Joi.string().email().optional(),
});

module.exports = { branchValidationSchema };
