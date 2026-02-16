const Event = require("./eventModel");

const createEvent = async (req, res, next) => {
  try {
    // Assuming your validation middleware puts data in req.validatedBody
    const eventData = req.validatedBody; 

    const newEvent = await Event.create(eventData);

    return res.status(201).json({
      success: true,
      message: "Eco event created successfully",
      data: newEvent,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { createEvent };