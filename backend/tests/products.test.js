const request = require('supertest');
const app = require('../index'); // export your express app from index.js
jest.setTimeout(30000); // 30 seconds

describe('Products API', () => {
  it('GET /api/products returns 200 and json', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('products');
  });
});
afterAll(async () => {
  const mongoose = require('mongoose');
  await mongoose.connection.close(); 
});
