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

const updateIssueStatusSchema = joi.object({
  status: joi
    .string()
    .valid("Pending", "InProgress", "Resolved", "Rejected")
    .required()
    .messages({
      "string.empty": "Status is required",
      "any.only":
        "Status must be one of: Pending, In progress, Resolved, Rejected",
    }),
});

const adminResponseSchema = joi.object({
  adminResponse: joi.string().min(1).max(2000).trim().required().messages({
    "string.min": "Admin response must be at least 1 character",
    "string.max": "Admin response must be at most 2000 characters",
    "string.empty": "Admin response is required",
  }),
});

module.exports = {
  createIssueSchema,
  updateIssueStatusSchema,
  adminResponseSchema,
};
