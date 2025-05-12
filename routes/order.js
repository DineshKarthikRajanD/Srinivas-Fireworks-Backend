const express = require("express");
const router = express.Router();
const { placeOrder } = require("../controllers/Order.js");

router.post("/place-order", placeOrder);

module.exports = router;
