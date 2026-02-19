const RecyclingCenter = require("./recycling.Model");
const PickupRequest = require("./pickupRequest.Model");

// GET all centers (with filters & search)
const getAllCenters = async (req, res) => {
  try {
    const { city, wasteType, search } = req.query;
    const filter = {};

    if (city) {
      filter.city = { $regex: city, $options: "i" };
    }

    if (wasteType) {
      filter.wasteTypes = wasteType;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { address: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
      ];
    }

    const centers = await RecyclingCenter.find(filter);
    res.status(200).json(centers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET one center by ID
const getCenterById = async (req, res) => {
  try {
    const center = await RecyclingCenter.findById(req.params.id);

    if (!center) {
      return res.status(404).json({ message: "Recycling center not found" });
    }

    res.status(200).json(center);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST create new center
const createCenter = async (req, res) => {
  try {
    const newCenter = await RecyclingCenter.create(req.body);
    res.status(201).json(newCenter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT update center
const updateCenter = async (req, res) => {
  try {
    const center = await RecyclingCenter.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    if (!center) {
      return res.status(404).json({ message: "Recycling center not found" });
    }

    res.status(200).json(center);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE center
const deleteCenter = async (req, res) => {
  try {
    const center = await RecyclingCenter.findById(req.params.id);

    if (!center) {
      return res.status(404).json({ message: "Recycling center not found" });
    }

    await center.deleteOne();
    res.status(200).json({ message: "Recycling center deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPickupRequest = async (req, res) => {
  try {
    const { wasteType, quantityKg, pickupDate, address, city, notes } =
      req.body;

    if (!wasteType || !quantityKg || !pickupDate || !address || !city) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }

    // if you have auth middleware, you can use req.user._id
    const userId = req.user?._id || req.body.userId;

    const pickupRequest = await PickupRequest.create({
      userId,
      wasteType,
      quantityKg,
      pickupDate,
      address,
      city,
      notes,
    });

    return res.status(201).json({
      message: "Pickup request created successfully",
      pickupRequest,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get my pickup requests
const getMyPickupRequests = async (req, res) => {
  try {
    const userId = req.user?._id;

    const requests = await PickupRequest.find({ userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json(requests);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get all pickup requests
const getAllPickupRequests = async (req, res) => {
  try {
    const requests = await PickupRequest.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json(requests);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updatePickupStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = ["Pending", "Accepted", "Collected", "Rejected"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const request = await PickupRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Pickup request not found" });
    }

    request.status = status;
    await request.save();

    return res.status(200).json({
      message: "Pickup status updated successfully",
      request,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCenters,
  getCenterById,
  createCenter,
  updateCenter,
  deleteCenter,
  createPickupRequest,
  getMyPickupRequests,
  getAllPickupRequests,
  updatePickupStatus,
};
