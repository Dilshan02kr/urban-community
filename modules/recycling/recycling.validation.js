const Joi = require("joi");

const createPickupRequestSchema = Joi.object({
  wasteType: Joi.string()
    .valid("plastic", "glass", "paper", "metal", "ewaste", "organic")
    .required()
    .messages({
      "any.only":
        "wasteType must be one of: plastic, glass, paper, metal, ewaste, organic",
      "any.required": "wasteType is required",
      "string.empty": "wasteType is required",
    }),

  quantityKg: Joi.number().greater(0).required().messages({
    "number.greater": "quantityKg must be greater than 0",
    "any.required": "quantityKg is required",
  }),

  pickupDate: Joi.date().min("now").required().messages({
    "date.min": "pickupDate cannot be in the past",
    "any.required": "pickupDate is required",
  }),

  address: Joi.string().trim().required().messages({
    "string.empty": "Address is required",
    "any.required": "Address is required",
  }),

  city: Joi.string().trim().required().messages({
    "string.empty": "City is required",
    "any.required": "City is required",
  }),

  notes: Joi.string().trim().optional().allow(""),

  userId: Joi.string().optional(),
});

const updatePickupStatusSchema = Joi.object({
  status: Joi.string()
    .valid("Pending", "Accepted", "Collected", "Rejected")
    .required()
    .messages({
      "any.only":
        "Status must be one of: Pending, Accepted, Collected, Rejected",
      "any.required": "Status is required",
      "string.empty": "Status is required",
    }),
});

module.exports = { createPickupRequestSchema, updatePickupStatusSchema };
