const RecyclingCenter = require("./recycling.Model");

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

module.exports = {
  getAllCenters,
  getCenterById,
  createCenter,
  updateCenter,
  deleteCenter,
};
