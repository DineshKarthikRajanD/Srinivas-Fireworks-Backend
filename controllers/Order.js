const Order = require("../models/OrderModel");
const Cracker = require("../models/CrackerModel");
const sendEmail = require("./utils/mailer"); // Import the mailer

const placeOrder = async (req, res) => {
  try {
    const { name, phone, email, address, items } = req.body;

    if (!name || !phone || !address || !items || items.length === 0) {
      return res.status(400).json({ message: "Missing required order fields" });
    }

    for (const item of items) {
      const crackerName = item.name?.trim().toLowerCase();
      const cracker = await Cracker.findOne({
        name: new RegExp(`^${crackerName}$`, "i"),
      });

      if (!cracker) {
        return res
          .status(404)
          .json({ message: `Cracker "${item.name}" not found.` });
      }

      if (cracker.stock < item.quantity) {
        await sendEmail(
          "Out of Stock Alert",
          `Attempted to order ${item.quantity} of "${cracker.name}", but only ${cracker.stock} left.`
        );
        return res.status(400).json({
          message: `Not enough stock for "${cracker.name}". Only ${cracker.stock} left.`,
        });
      }
    }

    // Reduce stock and check for low stock threshold
    for (const item of items) {
      const crackerName = item.name?.trim().toLowerCase();
      const cracker = await Cracker.findOne({
        name: new RegExp(`^${crackerName}$`, "i"),
      });

      const previousStock = cracker.stock;
      cracker.stock -= item.quantity;

      // Send low stock alert only when dropping below 5
      if (cracker.stock < 5 && previousStock >= 5) {
        await sendEmail(
          "Low Stock Alert",
          `Cracker "${cracker.name}" stock just dropped below 5. Current stock: ${cracker.stock}`
        );
      }

      await cracker.save();
    }

    const order = new Order({
      name,
      phone,
      email,
      address,
      items,
    });

    const savedOrder = await order.save();
    res.status(201).json({ message: "Order created", order: savedOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  placeOrder,
};
