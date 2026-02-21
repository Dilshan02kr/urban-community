const mongoose = require("mongoose");
const Issue = require("./issueModel");

exports.createIssue = async (req, res) => {
  try {
    const issue = await Issue.create({
      ...req.validatedBody,
      citizen: /*req.user.id*/ "69998a88f5a4ccb1cb74b9df",
      image: req.file ? req.file.path : null,
    });

    return res.status(201).json({
      success: true,
      data: issue,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.getAllIssues = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, category } = req.query;

    const filter = {};

    if (status) filter.status = status;
    if (category) filter.category = category;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const issues = await Issue.find(filter)
      .populate("citizen", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber);

    const total = await Issue.countDocuments(filter);

    return res.status(200).json({
      success: true,
      total,
      page: pageNumber,
      totalPages: Math.ceil(total / limitNumber),
      data: issues,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

exports.getIssueById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid issue ID",
      });
    }

    const issue = await Issue.findById(id).populate("citizen", "name email");

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: "Issue not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: issue,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};
