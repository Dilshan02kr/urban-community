const joi = require("joi");

const issueCategories = [
  "Infrastructure",
  "Waste",
  "Water",
  "Electricity",
  "Environment",
  "Safety",
  "Other",
];

const createIssueSchema = joi.object({
  title: joi.string().min(3).max(100).trim().required().messages({
    "string.min": "Title must be at least 3 characters long",
    "string.max": "Title must be at most 100 characters long",
    "string.empty": "Title is required",
  }),
  description: joi.string().min(10).max(1000).trim().required().messages({
    "string.min": "Description must be at least 10 characters long",
    "string.max": "Description must be at most 1000 characters long",
    "string.empty": "Description is required",
  }),
  category: joi
    .string()
    .valid(...issueCategories.map((c) => c.toLowerCase()))
    .required()
    .messages({
      "string.empty": "Category is required",
      "any.only": `Category must be one of: ${issueCategories.join(", ")}`,
    }),
  location: joi.string().min(3).trim().required().messages({
    "string.min": "Location must be at least 3 characters long",
    "string.empty": "Location is required",
  }),
});

module.exports = { createIssueSchema };
