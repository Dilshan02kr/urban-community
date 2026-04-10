const express = require("express");
const organizationController = require("./organizationController");
const validate = require("../../middlewares/validate");
const { registerSchema } = require("./organization.validation");

const router = express.Router();

router.post("/register", validate(registerSchema), organizationController.register);

module.exports = router;
