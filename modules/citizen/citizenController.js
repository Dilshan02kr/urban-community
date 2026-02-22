const Citizen = require("./citizenModel");

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

    user.token = token;
    delete user.password;

    return res.status(201).json({
      success: true,
      message: "Citizen registered successfully",
      data: {
        ...user.toObject(),
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
};
