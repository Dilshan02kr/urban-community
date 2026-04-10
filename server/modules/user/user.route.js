const express = require("express");
const userController = require("./userController");
const validate = require("../../middlewares/validate");
const { loginSchema } = require("./user.validation");

const router = express.Router();

router.post("/login", validate(loginSchema), userController.login);

module.exports = router;
