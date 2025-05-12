// routes/crackerRoutes.js
const express = require("express");
const { getAllCrackers } = require("../controllers/Admin/adminCrackers");
const { getAllOrders } = require("../controllers/Admin/adminOrders");
const { createCracker } = require("../controllers/Cracker");
const {
  updateCracker,
  getCrackerById,
  deleteCracker,
} = require("../controllers/Admin/adminCrackers");
const { getSalesReport } = require("../controllers/Admin/report");

const router = express.Router();

router.get("/crackers", getAllCrackers);
router.get("/order", getAllOrders);
router.post("/add-crackers", createCracker);
router.get("/update-cracker/:id", getCrackerById);
router.put("/update-cracker/:id", updateCracker);
router.delete("/delete-cracker/:id", deleteCracker);
router.get("/getreport", getSalesReport);

module.exports = router;
