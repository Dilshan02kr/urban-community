const express = require("express");
const issueController = require("./issueController");

const validate = require("../../middlewares/validate");
const { createIssueSchema } = require("./issue.validation");

const router = express.Router();

router.post(
  "/create",
  validate(createIssueSchema),
  issueController.createIssue,
);

module.exports = router;
