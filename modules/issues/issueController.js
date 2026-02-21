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
