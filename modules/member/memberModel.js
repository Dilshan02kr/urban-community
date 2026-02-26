const mongoose = require("mongoose");
import { MEMBER_STATUS } from "../../config/constant";

const memberSchema = new mongoose.Schema({
  _id: { type: Schema.Types.ObjectId, required: true, auto: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
