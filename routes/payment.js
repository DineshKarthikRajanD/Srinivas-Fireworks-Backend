const express = require("express");
const router = express.Router();
const { savePaymentDetails } = require("../controllers/Payment");

router.post("/save-payment", savePaymentDetails);

module.exports = router;
