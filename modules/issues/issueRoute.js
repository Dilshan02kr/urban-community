const express = require("express");
const router = express.Router();

const validate = require("../../middlewares/validate");
const {
  createIssueSchema,
  updateIssueStatusSchema,
} = require("./issue.validation");
const issueController = require("./issueController");
const upload = require("../../middlewares/upload.middleware");
const userAuth = require("../../middlewares/userAuth");

router.post(
  "/create",
  userAuth,
  upload.single("image"),
  validate(createIssueSchema),
  issueController.createIssue,
);

router.get("/",userAuth, issueController.getAllIssues);

router.get("/:id", userAuth, issueController.getIssueById);

router.get("/user/:userId", userAuth, issueController.getIssuesByUser);

router.patch(
  "/:id/status",
  userAuth,
  validate(updateIssueStatusSchema),
  issueController.updateIssueStatus,
);

router.delete("/:id", userAuth, issueController.deleteIssue);

module.exports = router;
