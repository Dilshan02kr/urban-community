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

    const token = generateToken({ id: organization._id });

    const orgResponse = organization.toObject();
    delete orgResponse.password;
    orgResponse.token = token;

    return res.status(201).json({
      success: true,
      message: "Organization registered successfully",
      data: orgResponse,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
};
