const Joi = require("joi");

// Recycling Center Schemas

const VALID_WASTE_TYPES = [
  "plastic",
  "glass",
  "paper",
  "metal",
  "ewaste",
  "organic",
];

const createCenterSchema = Joi.object({
  name: Joi.string().trim().min(2).max(200).required().messages({
    "string.min": "Name must be at least 2 characters",
    "string.max": "Name must be at most 200 characters",
    "string.empty": "Name is required",
    "any.required": "Name is required",
  }),

  address: Joi.string().trim().min(5).max(300).required().messages({
    "string.min": "Address must be at least 5 characters",
    "string.max": "Address must be at most 300 characters",
    "string.empty": "Address is required",
    "any.required": "Address is required",
  }),

  city: Joi.string().trim().min(2).max(100).required().messages({
    "string.min": "City must be at least 2 characters",
    "string.max": "City must be at most 100 characters",
    "string.empty": "City is required",
    "any.required": "City is required",
  }),

  wasteTypes: Joi.array()
    .items(Joi.string().valid(...VALID_WASTE_TYPES))
    .min(1)
    .required()
    .messages({
      "array.min": "At least one waste type is required",
      "any.required": "wasteTypes is required",
      "any.only": `Each waste type must be one of: ${VALID_WASTE_TYPES.join(", ")}`,
    }),

  latitude: Joi.number().min(-90).max(90).required().messages({
    "number.min": "Latitude must be between -90 and 90",
    "number.max": "Latitude must be between -90 and 90",
    "any.required": "Latitude is required",
  }),

  longitude: Joi.number().min(-180).max(180).required().messages({
    "number.min": "Longitude must be between -180 and 180",
    "number.max": "Longitude must be between -180 and 180",
    "any.required": "Longitude is required",
  }),

  contactNumber: Joi.string().trim().optional().allow("").messages({
    "string.base": "Contact number must be a string",
  }),

  openHours: Joi.string().trim().optional().allow("").messages({
    "string.base": "Open hours must be a string",
  }),
});

// All fields optional for partial updates
const updateCenterSchema = createCenterSchema.fork(
  ["name", "address", "city", "wasteTypes", "latitude", "longitude"],
  (field) => field.optional(),
);

// Pickup Request Schemas

const createPickupRequestSchema = Joi.object({
  wasteType: Joi.string()
    .valid(...VALID_WASTE_TYPES)
    .required()
    .messages({
      "any.only": `wasteType must be one of: ${VALID_WASTE_TYPES.join(", ")}`,
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

module.exports = {
  createCenterSchema,
  updateCenterSchema,
  createPickupRequestSchema,
  updatePickupStatusSchema,
};
