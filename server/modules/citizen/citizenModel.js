const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

citizenSchema.pre("save", async function () {
  if (!this.isModified("password")) {
      return;
  }
  this.password = await bcrypt.hash(this.password, 10);
});

const Citizen = mongoose.model("Citizen", citizenSchema);
module.exports = Citizen;
