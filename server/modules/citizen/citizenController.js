const Citizen = require("./citizenModel");
const { generateToken } = require("../../utils/tokenManager");

const register = async (req, res, next) => {
  try {
    const value = req.validatedBody;

    //step 1: check if the user is already registered
    const existingUser = await Citizen.findOne({ email: value.email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "Email already registered" });
    }

    const user = await Citizen.create(value);

    //step 3: generate token
    const token = generateToken({ id: user._id });

    let userResponse = user.toObject();
    userResponse.role = "citizen";
    delete userResponse.password;
    delete user.password;

    return res.status(201).json({
      success: true,
      message: "Citizen registered successfully",
      data: { token, user: userResponse },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
};
