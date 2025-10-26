const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;

    // 🧱 SAFETY CHECK — prevent test runs from connecting to production Atlas
    if (process.env.NODE_ENV === "test" && uri.includes("mongodb+srv")) {
      throw new Error("❌ Tests should NOT connect to production Atlas DB!");
    }

    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    if (process.env.NODE_ENV !== "test") {
      process.exit(1);
    }
  }
};

module.exports = connectDB;
