const express = require("express");
const { createCracker, getAllCrackers } = require("../controllers/Cracker");

const router = express.Router();

router.post("/add-cracker", createCracker);
router.get("/getall-crackers", getAllCrackers);

module.exports = router;
