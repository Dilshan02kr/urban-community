const mongoose = require("mongoose");
const { MEMBER_STATUS } = require("../../config/constant");

const memberSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Citizen",
    required: true,
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  status: {
    type: String,
    enum: [
      MEMBER_STATUS.PENDING,
      MEMBER_STATUS.ACCEPTED,
      MEMBER_STATUS.REJECTED,
    ],
    default: MEMBER_STATUS.PENDING,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

memberSchema.index({ createdAt: -1 });

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
