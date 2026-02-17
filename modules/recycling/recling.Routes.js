const express = require("express");
const router = express.Router();

const {
  getAllCenters,
  getCenterById,
  createCenter,
  updateCenter,
  deleteCenter,
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

module.exports = router;
