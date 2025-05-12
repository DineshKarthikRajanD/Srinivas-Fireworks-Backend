const Order = require("../models/OrderModel");
const Cracker = require("../models/CrackerModel");

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
        return res.status(400).json({
          message: `Not enough stock for "${cracker.name}". Only ${cracker.stock} left.`,
        });
      }
    }

    for (const item of items) {
      const crackerName = item.name?.trim().toLowerCase();
      const cracker = await Cracker.findOne({
        name: new RegExp(`^${crackerName}$`, "i"),
      });

      cracker.stock -= item.quantity;
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
