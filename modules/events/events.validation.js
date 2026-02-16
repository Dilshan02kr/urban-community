const Joi = require("joi");

const createEventSchema = Joi.object({
  title: Joi.string().min(5).max(100).trim().required(),
  description: Joi.string().min(10).required(),
  date: Joi.date().greater('now').required(),
  location: Joi.string().required(),
  organization: Joi.string().required(), // Usually an ID or name
});

module.exports = { createEventSchema };