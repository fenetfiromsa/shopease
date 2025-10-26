const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../index");
const User = require("../models/User"); // ✅ Add this line
jest.setTimeout(30000); // 30 seconds

beforeAll(async () => {
  await User.deleteMany(); // clear users before test
});

describe("User Authentication API", () => {
  const testUser = {
    name: "John Doe",
    email: "johndoe@test.com",
    password: "123456",
  };

  it("POST /api/users/signup → should register a new user", async () => {
    const res = await request(app).post("/api/users/signup").send(testUser);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
    expect(res.body.email).toBe(testUser.email);
  });

  it("POST /api/users/login → should log in an existing user", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({ email: testUser.email, password: testUser.password });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("POST /api/users/login → should fail with wrong password", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({ email: testUser.email, password: "wrongpass" });

    expect(res.statusCode).toBe(401);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
