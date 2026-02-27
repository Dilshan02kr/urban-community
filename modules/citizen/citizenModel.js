const mongoose = require("mongoose");

const citizenSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

citizenSchema.index({ createdAt: -1 });

const Citizen = mongoose.model("Citizen", citizenSchema);

module.exports = Citizen;
