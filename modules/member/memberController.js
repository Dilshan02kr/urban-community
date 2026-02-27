const mongoose = require("mongoose");
const Event = require("../events/eventModel");
const Member = require("./memberModel");
const Citizen = require("../citizen/citizenModel");
const { MEMBER_STATUS } = require("../../config/constant");

const sendRequest = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const eventId = req.body.eventId;

    if (!eventId || !mongoose.isValidObjectId(eventId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID",
      });
    }

    //step 1: is valid user
    const user = await Citizen.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Citizen not found",
      });
    }

    //step 2: is valid event
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    //step 3: is user already a member of the event
    const member = await Member.aggregate([
      {
        $match: {
          userId: userId,
          eventId: eventId,
          status: MEMBER_STATUS.ACCEPTED,
        },
      },
    ]);

    if (member.length > 0) {
      return res.status(400).json({
        success: false,
        message: "User is already a member of the event",
      });
    }

    //step 4: check if the already has a pending request
    const pendingRequest = await Member.aggregate([
      {
        $match: {
          userId: userId,
          eventId: eventId,
          status: MEMBER_STATUS.PENDING,
        },
      },
    ]);

    if (pendingRequest.length > 0) {
      return res.status(400).json({
        success: false,
        message: "User already has a pending request",
      });
    }

    //step 5: create a new member
    const newMember = await Member.create({
      userId: userId,
      eventId: eventId,
      status: MEMBER_STATUS.PENDING,
    });

    return res.status(201).json({
      success: true,
      message: "Request sent successfully",
      data: {
        ...newMember.toObject(),
      },
    });
  } catch (error) {
    next(error);
  }
};

const getRequests = async (req, res, next) => {
  try {
    const eventId = req.params.eventId;

    if (!eventId || !mongoose.isValidObjectId(eventId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID",
      });
    }

    //step 1: is valid event
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }
    //step 2: get all requests
    const requests = await Member.aggregate([
      {
        $match: {
          eventId: new mongoose.Types.ObjectId(eventId),
          status: MEMBER_STATUS.PENDING,
        },
      },
      {
        $lookup: {
          from: "citizens",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
      {
        $project: {
          _id: 1,
          userId: 1,
          createdAt: 1,
          userDetails: {
            _id: "$userDetails._id",
            name: "$userDetails.name",
            email: "$userDetails.email",
          },
        },
      },
    ]);

    if (requests.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No pending requests found",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Requests fetched successfully",
      data: requests,
    });
  } catch (error) {
    next(error);
  }
};

const responseRequest = async (req, res, next) => {
  try {
    const requestId = req.params.requestId;
    const { status } = req.validatedBody ?? req.body;

    if (!requestId || !mongoose.isValidObjectId(requestId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid request ID",
      });
    }

    //step 1: is valid request
    const request = await Member.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(requestId),
          status: MEMBER_STATUS.PENDING,
        },
      },
    ]);

    if (request.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Pending request not found",
      });
    }

    //step 2: update the request status
    await Member.findByIdAndUpdate(requestId, { status: status });
    return res.status(200).json({
      success: true,
      message: `${status === MEMBER_STATUS.ACCEPTED ? "Accepted" : "Rejected"} request responded successfully`,
    });
  } catch (error) {
    next(error);
  }
};

const getMembers = async (req, res, next) => {
  try {
    const eventId = req.params.eventId;
    const organizationId = req.user.id;

    if (!eventId || !mongoose.isValidObjectId(eventId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID",
      });
    }

    //step 1: is valid event
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }
    //step 2: user is organizer of the event
    const user = await Event.aggregate([
      {
        $match: {
          _id: eventId,
          organization: organizationId,
        },
      },
    ]);

    // if (user.length === 0) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "You are not authorized to access this event",
    //   });
    // }

    //step 3: get all members
    const members = await Member.aggregate([
      {
        $match: {
          eventId: new mongoose.Types.ObjectId(eventId),
          status: MEMBER_STATUS.ACCEPTED,
        },
      },
      {
        $lookup: {
          from: "citizens",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
      {
        $project: {
          _id: 1,
          userId: 1,
          createdAt: 1,
          status: 1,
          userDetails: {
            _id: "$userDetails._id",
            name: "$userDetails.name",
            email: "$userDetails.email",
          },
        },
      },
    ]);

    if (members.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No members found",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Members fetched successfully",
      data: members,
    });
  } catch (error) {
    next(error);
  }
};

const deleteMember = async (req, res, next) => {
  try {
    const { eventId, memberId } = req.validatedBody;

    //step 1: is valid event
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }
    //step 2: is valid member
    const member = await Member.findById(memberId);
    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }
    //step 3: delete the member
    await Member.findByIdAndDelete(memberId);
    return res.status(200).json({
      success: true,
      message: "Member deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendRequest,
  getRequests,
  responseRequest,
  getMembers,
  deleteMember,
};
