const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(200).trim().required().messages({
    "string.min": "Name must be at least 2 characters",
    "string.empty": "Name is required",
  }),
  description: Joi.string().min(2).trim().required().messages({
    "string.min": "Description must be at least 2 characters",
    "string.empty": "Description is required",
  }),
  address: Joi.string().min(2).trim().required().messages({
    "string.min": "Address must be at least 2 characters",
    "string.empty": "Address is required",
  }),
  phone: Joi.string().min(6).trim().required().messages({
    "string.min": "Please provide a valid phone number",
    "string.empty": "Phone is required",
  }),
  email: Joi.string().email().lowercase().trim().required().messages({
    "string.email": "Please provide a valid email address",
    "string.empty": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters",
    "string.empty": "Password is required",
  }),
});

module.exports = { registerSchema };
