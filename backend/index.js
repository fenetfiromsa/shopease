const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// CORS setup
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://shopease-chi-six.vercel.app",
   "https://shopease-chi-six.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      console.log("❌ CORS blocked request from:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// Test route
app.get("/", (req, res) => {
  res.send("✅ Backend is running!");
});

// API routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err);
  res.status(500).json({
    message: err.message || "Server error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

// Start server
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

module.exports = app;
