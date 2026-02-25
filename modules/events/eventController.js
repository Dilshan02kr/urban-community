const Event = require("./eventModel");

const createEvent = async (req, res, next) => {
  try {
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

const updateEvent = async (req, res, next) => {
  try {
    const { id } = req.params; 
    const updateData = req.validatedBody;

    const updatedEvent = await Event.findByIdAndUpdate(id, updateData, {
      new: true,           
      runValidators: true, 
    });

    if (!updatedEvent) {
      return res.status(404).json({ 
        success: false, 
        message: "Event not found" 
      });
    }

    return res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: updatedEvent,
    });
  } catch (err) {
    next(err);
  }
};

const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({ 
        success: false, 
        message: "Event not found" 
      });
    }

    return res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
const getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find().sort({ date: 1 });

    return res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (err) {
    next(err);
  }
};

const getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: event,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { 
  createEvent, 
  updateEvent, 
  deleteEvent,
  getAllEvents,
  getEventById
};