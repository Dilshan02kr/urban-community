const Event = require("./eventModel");
const Member = require("../member/memberModel");

// Create event
const createEvent = async (req, res, next) => {
  try {
    const eventData = {
      ...req.validatedBody,
      orgId: req.user.id,
    };

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

//update event
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
        message: "Event not found",
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

//delete event
const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
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

//get all events
const getAllEvents = async (req, res, next) => {
  try {
    const userId = req?.user?.id;

    const events = await Event.find().sort({ date: -1 });

    // Attach current user's membership status per event (if user is authenticated).
    let membershipByEventId = {};

    if (userId && events.length > 0) {
      const eventIds = events.map((event) => event._id);
      const memberships = await Member.find({
        userId,
        eventId: { $in: eventIds },
      })
        .sort({ createdAt: -1 })
        .lean();

      membershipByEventId = memberships.reduce((acc, membership) => {
        const eventKey = membership.eventId.toString();
        if (!acc[eventKey]) {
          acc[eventKey] = membership.status;
        }
        return acc;
      }, {});
    }

    const eventsWithMembership = events.map((event) => {
      const membershipStatus = membershipByEventId[event._id.toString()] || null;

      return {
        ...event.toObject(),
        membershipStatus,
      };
    });

    return res.status(200).json({
      success: true,
      count: events.length,
      data: eventsWithMembership,
    });
  } catch (err) {
    next(err);
  }
};

//get one event
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
  getEventById,
};
