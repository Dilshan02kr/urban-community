const express = require("express");
const userController = require("./citizenController");

const validate = require("../../middlewares/validate");
const { registerSchema } = require("./citizen.validation");

const router = express.Router();

router.post("/register", validate(registerSchema), userController.register);

module.exports = router;
