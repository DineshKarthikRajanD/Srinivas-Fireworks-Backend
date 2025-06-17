// salesReportController.js

const Order = require("../../models/OrderModel");
const Payment = require("../../models/PaymentModel");
const Cracker = require("../../models/CrackerModel");

// Helper function to normalize cracker names (example: lowercase & trim)
function normalizeName(name) {
  return name.trim().toLowerCase();
}

const getSalesReport = async (req, res) => {
  try {
    const { month } = req.query;

    let orderFilter = {};
    if (month) {
      const startDate = new Date(`${month}-01T00:00:00.000Z`);
      const nextMonth = new Date(startDate);
      nextMonth.setMonth(startDate.getMonth() + 1);

      orderFilter.createdAt = {
        $gte: startDate,
        $lt: nextMonth,
      };
    }

    const [orders, payments, crackers] = await Promise.all([
      Order.find(orderFilter),
      Payment.find(),
      Cracker.find(),
    ]);

    const crackerMap = {};
    crackers.forEach((cracker) => {
      crackerMap[normalizeName(cracker.name)] = cracker;
    });

    const paidOrderIds = new Set(
      payments.map((p) => p.orderId?.toString()).filter(Boolean)
    );

    const crackerSales = {};
    let totalRevenue = 0;
    let totalUnitsSold = 0;

    for (const order of orders) {
      if (!order._id || !paidOrderIds.has(order._id.toString())) continue;

      for (const item of order.items || []) {
        if (!item.name || !item.quantity || !item.price) continue;

        const crackerName = normalizeName(item.name);
        const cracker = crackerMap[crackerName];

        if (!cracker) {
          console.warn(`No cracker found for item: "${item.name}"`);
          continue;
        }

        const quantity = item.quantity;
        const revenue = quantity * item.price;

        if (!crackerSales[crackerName]) {
          crackerSales[crackerName] = {
            name: cracker.name,
            image: cracker.image,
            type: cracker.crackerType,
            totalSold: 0,
            revenue: 0,
          };
        }

        crackerSales[crackerName].totalSold += quantity;
        crackerSales[crackerName].revenue += revenue;

        totalRevenue += revenue;
        totalUnitsSold += quantity;
      }
    }

    const salesByCracker = Object.values(crackerSales).sort(
      (a, b) => b.totalSold - a.totalSold
    );

    const mostSoldCracker = salesByCracker[0] || null;

    res.status(200).json({
      mostSoldCracker,
      totalRevenue,
      totalUnitsSold,
      salesByCracker,
    });
  } catch (err) {
    console.error("Error generating report:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getSalesReport };
