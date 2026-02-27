const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { USER_ROLE } = require("../../config/constant");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: USER_ROLE.ADMIN,
    enum: [USER_ROLE.ADMIN],
  },
}, { timestamps: true });

adminSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
