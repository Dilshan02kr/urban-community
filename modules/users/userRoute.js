const express = require("express");
const userController = require("./userController");

const validate = require("../../middlewares/validate");
const { registerSchema } = require("./user.validation");

const router = express.Router();

router.post("/register", validate(registerSchema), userController.register);

module.exports = router;
