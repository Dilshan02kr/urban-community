const express = require("express");
const router = express.Router();

const {
  getAllCenters,
  getCenterById,
  createCenter,
  updateCenter,
  deleteCenter,
} = require("./recycling.Controller");

const {
  createPickupRequest,
  getMyPickupRequests,
  getAllPickupRequests,
  updatePickupStatus,
} = require("./recycling.Controller");

// GET all centers (with filters/search)
router.get("/centers", getAllCenters);

// GET one center by ID
router.get("/centers/:id", getCenterById);

// POST create center
router.post("/centers", createCenter);

// PUT update center
router.put("/centers/:id", updateCenter);

// DELETE center
router.delete("/centers/:id", deleteCenter);

// Citizen create pickup request
router.post("/request-pickup", createPickupRequest);

// Citizen view my pickup requests
router.get("/pickups/my", getMyPickupRequests);

// Admin view all pickup requests
router.get("/pickups", getAllPickupRequests);

// Admin update pickup request status
router.put("/pickups/:id/status", updatePickupStatus);

module.exports = router;
