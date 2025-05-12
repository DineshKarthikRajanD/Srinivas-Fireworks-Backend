// controllers/admin.js
const Cracker = require("../../models/CrackerModel");

const getAllCrackers = async (req, res) => {
  try {
    const crackers = await Cracker.find();
    const grouped = {};
    crackers.forEach((cracker) => {
      if (!grouped[cracker.crackerType]) {
        grouped[cracker.crackerType] = [];
      }
      grouped[cracker.crackerType].push(cracker);
    });

    res.status(200).json(grouped);
  } catch (err) {
    res.status(500).json({ message: "Error fetching crackers", error: err });
  }
};

const getCrackerById = async (req, res) => {
  try {
    const cracker = await Cracker.findById(req.params.id);
    if (!cracker) {
      return res.status(404).json({ message: "Cracker not found" });
    }
    res.status(200).json(cracker);
  } catch (error) {
    console.error("Error fetching cracker:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateCracker = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, image, crackerType, stock } = req.body;

    const updatedCracker = await Cracker.findByIdAndUpdate(
      id,
      {
        name,
        price,
        image,
        crackerType,
        stock,
      },
      { new: true } 
    );

    if (!updatedCracker) {
      return res.status(404).json({ message: "Cracker not found" });
    }

    res.status(200).json(updatedCracker);
  } catch (error) {
    console.error("Error updating cracker:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteCracker = async (req, res) => {
  try {
    const deletedCracker = await Cracker.findByIdAndDelete(req.params.id);

    if (!deletedCracker) {
      return res.status(404).json({ message: "Cracker not found" });
    }

    res.status(200).json({ message: "Cracker deleted successfully" });
  } catch (error) {
    console.error("Error deleting cracker:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllCrackers,
  getCrackerById,
  updateCracker,
  deleteCracker,
};
