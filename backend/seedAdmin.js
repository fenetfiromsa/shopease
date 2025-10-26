const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await User.deleteMany({ email: "admin@shopease.com" }); // cleanup if any

    const admin = await User.create({
      name: "Admin User",
      email: "admin@shopease.com",
      password: "123456",
      isAdmin: true,
    });

    console.log("✅ Admin created:", admin);
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error seeding admin:", error);
  }
};

seedAdmin();
