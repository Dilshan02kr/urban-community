const Citizen = require("./citizenModel");
const { generateToken } = require("../../utils/tokenManager");

const register = async (req, res, next) => {
  try {
    const body = req.body;

    //step 1: check if the user is already registered
    const existingUser = await Citizen.findOne({ email: body.email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "Email already registered" });
    }

    const user = await Citizen.create(body);

    //step 3: generate token
    const token = generateToken({ id: user._id });

    const userResponse = user.toObject();
    userResponse.token = token;
    delete userResponse.password;
    delete user.password;

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
