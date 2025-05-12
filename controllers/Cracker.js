const Cracker = require("../models/CrackerModel");

const createCracker = async (req, res) => {
  try {
    const newCracker = new Cracker(req.body);
    const savedCracker = await newCracker.save();
    res.status(201).json(savedCracker);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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

module.exports = {
  createCracker,
  getAllCrackers,
};
