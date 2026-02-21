const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 1000,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "infrastructure",
        "waste",
        "water",
        "electricity",
        "environment",
        "safety",
        "other",
      ],
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ["Pending", "In progress", "Resolved", "Rejected"],
      default: "Pending",
    },
    citizen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    adminResponse: {
      type: String,
      trim: true,
      default: null,
    },
    resolvedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

issueSchema.index({ status: 1 });
issueSchema.index({ category: 1 });
issueSchema.index({ citizen: 1 });
issueSchema.index({ createdAt: -1 });

issueSchema.pre("save", function (next) {
  if (this.isModified("status") && this.status === "Resolved") {
    this.resolvedAt = new Date();
  }
  // next();
});

const Issue = mongoose.model("Issue", issueSchema);

module.exports = Issue;
