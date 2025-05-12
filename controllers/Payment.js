const Payment = require("../models/PaymentModel");
const Order = require("../models/OrderModel");

const savePaymentDetails = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
      currency,
      customer_name,
      customer_email,
      orderId,
    } = req.body;

    if (!orderId) {
      return res.status(400).json({ message: "orderId is required" });
    }

    const payment = new Payment({
      orderId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
      currency,
      customer_name,
      customer_email,
    });

    const savedPayment = await payment.save();

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.paymentId = savedPayment._id;
    await order.save();

    res
      .status(201)
      .json({ message: "Payment saved successfully", payment: savedPayment });
  } catch (error) {
    console.error("Error saving payment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  savePaymentDetails,
};
