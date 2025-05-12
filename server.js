require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const crackerRoutes = require("./routes/crackers");
const orderRoutes = require("./routes/order");
const paymentRoutes = require("./routes/payment");
const adminRoutes = require("./routes/admin");
const adminAuthRoutes = require("./routes/auth");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/crackers", crackerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/admin", adminRoutes);
app.use('/api', adminAuthRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.listen(5000, () =>
  console.log("🚀 Server running on http://localhost:5000")
);
