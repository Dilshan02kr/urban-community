const Joi = require("joi");

const responseRequestSchema = Joi.object({
  status: Joi.string()
    .valid("Accepted", "Rejected")
    .required()
    .messages({
      "any.only": "Status must be Accepted or Rejected",
      "string.empty": "Status is required",
    }),
});

const deleteMemberSchema = Joi.object({
  memberId: Joi.string()
    .pattern(/^[a-fA-F0-9]{24}$/)
    .required()
    .messages({
      "string.empty": "Member ID is required",
      "string.pattern.base": "Member ID must be a valid 24-character hex ID",
    }),
  eventId: Joi.string()
    .pattern(/^[a-fA-F0-9]{24}$/)
    .required()
    .messages({
      "string.empty": "Event ID is required",
      "string.pattern.base": "Event ID must be a valid 24-character hex ID",
    }),
});

module.exports = { responseRequestSchema, deleteMemberSchema };
