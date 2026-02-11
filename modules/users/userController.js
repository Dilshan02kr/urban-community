const User = require("./userModel");

const register = async (req, res, next) => {
  try {
    const value = req.validatedBody;

    const existingUser = await User.findOne({ email: value.email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "Email already registered" });
    }

    const user = await User.create(value);

    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: userResponse,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
};
