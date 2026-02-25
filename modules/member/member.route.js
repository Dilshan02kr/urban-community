const express = require("express");
const memberController = require("./memberController");
const router = express.Router();
const auth = require("../../middlewares/userAuth");

router.post("/send-request", auth, memberController.sendRequest);
router.get("/get-requests/:eventId", auth, memberController.getRequests);
router.put("/response-request/:requestId", auth, memberController.responseRequest);
router.get("/get-members/:eventId", auth, memberController.getMembers);
router.delete("/delete-member", auth, memberController.deleteMember);

module.exports = router;
