const Citizen = require("./citizenModel");

const register = async (req, res, next) => {
  try {
    const value = req.validatedBody;

    const existingUser = await Citizen.findOne({ email: value.email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "Email already registered" });
    }

    const user = await Citizen.create(value);

    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(201).json({
      success: true,
      message: "Citizen registered successfully",
      data: userResponse,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
};
