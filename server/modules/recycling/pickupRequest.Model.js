const mongoose = require("mongoose");

const pickupRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Citizen",
      required: true,
    },

    wasteType: {
      type: String,
      required: true,
      enum: ["plastic", "glass", "paper", "metal", "ewaste", "organic"],
    },

    quantityKg: {
      type: Number,
      required: true,
      min: 1,
    },

    pickupDate: {
      type: Date,
      required: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Accepted", "Collected", "Rejected"],
      default: "Pending",
    },

    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("PickupRequest", pickupRequestSchema);
