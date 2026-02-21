const express = require("express");
const router = express.Router();

const validate = require("../../middlewares/validate");
const { createIssueSchema } = require("./issue.validation");
const issueController = require("./issueController");
const upload = require("../../middlewares/upload.middleware");

router.post(
  "/create",
  // authMiddleware,
  upload.single("image"),
  validate(createIssueSchema),
  issueController.createIssue,
);

module.exports = router;
