const mongoose = require("mongoose");

const CrackerSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  crackerType: String,
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("Cracker", CrackerSchema);
