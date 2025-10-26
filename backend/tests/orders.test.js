const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../index");
const User = require("../models/User");
const Product = require("../models/Product");

jest.setTimeout(30000); // ✅ Increase timeout for MongoDB connection delays

describe("Orders API", () => {
  let token;
  let productId;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI); // ✅ Ensure DB is connected for test
    await User.deleteMany();
    await Product.deleteMany();

    // ✅ Create test user
    const signupRes = await request(app)
      .post("/api/users/signup")
      .send({
        name: "Order Tester",
        email: "ordertest@test.com",
        password: "123456",
      });

    token = signupRes.body.token;

    // ✅ Create test product
    const product = await Product.create({
      name: "Order Product",
      description: "For testing",
      price: 99,
      stock: 10,
      category: "Test",
    });

    productId = product._id;
  });

  it("POST /api/orders → should create a new order", async () => {
    const orderData = {
      orderItems: [{ product: productId, quantity: 1 }],
      totalAmount: 99,
      shippingAddress: "123 Test St",
    };

    const res = await request(app)
      .post("/api/orders")
      .set("Authorization", `Bearer ${token}`)
      .send(orderData);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.totalAmount).toBe(orderData.totalAmount);
  });

  it("GET /api/orders/myorders → should get user's orders", async () => {
    const res = await request(app)
      .get("/api/orders/myorders")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
