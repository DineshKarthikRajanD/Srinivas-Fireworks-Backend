const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
  razorpay_order_id: String,
  razorpay_payment_id: String,
  razorpay_signature: String,
  amount: Number,
  currency: {
    type: String,
    default: "INR",
  },
  customer_name: String,
  customer_email: String,
});

module.exports = mongoose.model("Payment", PaymentSchema);
