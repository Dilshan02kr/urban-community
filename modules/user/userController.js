const Organization = require("../organization/organizationModel");
const Citizen = require("../citizen/citizenModel");
const bcrypt = require("bcrypt");

const login = async (req, res, next) => {
  try {
    const body = req.body;

    let user = null;

    //step 1: check if the user is a citizen
    const citizen = await Citizen.findOne({ email: body.email });
    if (citizen) {
      const isPasswordValid = await bcrypt.compare(
        body.password,
        citizen.password,
      );
      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid password" });
      }
      user = citizen;
    }

    //step 2: check if the user is an organization
    const organization = await Organization.findOne({ email: body.email });
    if (organization) {
      const isPasswordValid = await bcrypt.compare(
        body.password,
        organization.password,
      );
      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid password" });
      }
      user = organization;
    }

    //step 3: generate token
    const token = generateToken({ id: user._id });

    user.token = token;
    delete user.password;

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        ...user.toObject(),
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
};
