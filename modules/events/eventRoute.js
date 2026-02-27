const express = require("express");
const eventController = require("./eventController");
const validate = require("../../middlewares/validate");
const { createEventSchema, updateEventSchema } = require("./events.validation");

const router = express.Router();

router.get("/", eventController.getAllEvents);

router.get("/:id", eventController.getEventById);

router.post("/", validate(createEventSchema), eventController.createEvent);

router.put("/:id", validate(updateEventSchema), eventController.updateEvent);

router.delete("/:id", eventController.deleteEvent);

module.exports = router;