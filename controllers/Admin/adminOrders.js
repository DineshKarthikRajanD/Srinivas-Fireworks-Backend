const Order = require("../../models/OrderModel");
const Payment = require("../../models/PaymentModel");

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    const payments = await Payment.find();

    const mergedOrders = orders.map((order) => {
      const matchingPayment = payments.find(
        (pay) => pay.customer_name === order.name
      );

      return {
        ...order.toObject(),
        payment: matchingPayment || null,
      };
    });

    res.status(200).json(mergedOrders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders", error: err });
  }
};

module.exports = {
  getAllOrders,
};
