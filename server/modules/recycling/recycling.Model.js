const mongoose = require("mongoose");

const recyclingCenterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
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

    wasteTypes: {
      type: [String],
      required: true,
      enum: ["plastic", "glass", "paper", "metal", "ewaste", "organic"],
    },

    latitude: {
      type: Number,
      required: true,
    },

    longitude: {
      type: Number,
      required: true,
    },

    contactNumber: {
      type: String,
      required: false,
    },

    openHours: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("RecyclingCenter", recyclingCenterSchema);
