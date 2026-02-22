const express = require("express");
const eventController = require("./eventController");
const validate = require("../../middlewares/validate");
const { createEventSchema } = require("./events.validation");

const router = express.Router();

// POST /api/events
router.post("/", validate(createEventSchema), eventController.createEvent);

module.exports = router;