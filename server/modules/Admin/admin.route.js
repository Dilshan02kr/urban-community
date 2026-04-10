const express = require("express");
const adminController = require("./adminController");
const validate = require("../../middlewares/validate");
const { loginSchema, registerSchema } = require("./admin.validation");

const router = express.Router();

router.post("/register", validate(registerSchema), adminController.register);
router.post("/login", validate(loginSchema), adminController.login);

module.exports = router;
