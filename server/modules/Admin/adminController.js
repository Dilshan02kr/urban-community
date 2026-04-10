const Admin = require("./adminModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../../utils/tokenManager");
const { USER_ROLE } = require("../../config/constant");

const register = async (req, res, next) => {
  try {
    const value = req.validatedBody;

    const existing = await Admin.findOne({ email: value.email });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    const admin = await Admin.create(value);
    const token = generateToken({
      id: admin._id.toString(),
      role: USER_ROLE.ADMIN,
    });

    const adminResponse = admin.toObject();
    delete adminResponse.password;
    adminResponse.token = token;
    adminResponse.role = USER_ROLE.ADMIN;

    return res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      data: adminResponse,
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.validatedBody;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken({
      id: admin._id.toString(),
      role: USER_ROLE.ADMIN,
    });

    const adminResponse = admin.toObject();
    delete adminResponse.password;
    adminResponse.token = token;
    adminResponse.role = USER_ROLE.ADMIN;

    return res.status(200).json({
      success: true,
      message: "Admin login successful",
      data: adminResponse,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };
