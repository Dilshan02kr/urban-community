const Organization = require("./organizationModel");
const { generateToken } = require("../../utils/tokenManager");

const register = async (req, res, next) => {
  try {
    const value = req.validatedBody;

    const existingOrg = await Organization.findOne({ email: value.email });
    if (existingOrg) {
      return res
        .status(409)
        .json({ success: false, message: "Email already registered" });
    }

    const organization = await Organization.create(value);

    //step 3: generate token
    const token = generateToken({ id: organization._id });

    organization.token = token;
    delete organization.password;

    return res.status(201).json({
      success: true,
      message: "Organization registered successfully",
      data: {
        ...organization.toObject(),
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
};
