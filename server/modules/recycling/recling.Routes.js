const express = require("express");
const router = express.Router();
const validate = require("../../middlewares/validate");
const userAuth = require("../../middlewares/userAuth");
const adminAuth = require("../../middlewares/AdminAuth");

const {
  getAllCenters,
  getCenterById,
  createCenter,
  updateCenter,
  deleteCenter,
  createPickupRequest,
  getMyPickupRequests,
  getAllPickupRequests,
  updatePickupStatus,
} = require("./recycling.Controller");

const {
  createCenterSchema,
  updateCenterSchema,
  createPickupRequestSchema,
  updatePickupStatusSchema,
} = require("./recycling.validation");

// GET all centers (with filters/search)
router.get("/centers", getAllCenters);

// GET one center by ID
router.get("/centers/:id", getCenterById);

// POST create center
router.post("/centers", adminAuth, validate(createCenterSchema), createCenter);

// PUT update center
router.put(
  "/centers/:id",
  adminAuth,
  validate(updateCenterSchema),
  updateCenter,
);

// DELETE center
router.delete("/centers/:id", adminAuth, deleteCenter);

// Citizen create pickup request
router.post(
  "/request-pickup",
  userAuth,
  validate(createPickupRequestSchema),
  createPickupRequest,
);

// Citizen view my pickup requests
router.get("/pickups/my", userAuth, getMyPickupRequests);

// Admin view all pickup requests
router.get("/pickups", adminAuth, getAllPickupRequests);

// Admin update pickup request status
router.put(
  "/pickups/:id/status",
  adminAuth,
  validate(updatePickupStatusSchema),
  updatePickupStatus,
);

module.exports = router;
