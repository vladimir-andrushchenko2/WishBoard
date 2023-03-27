// endpoint.test.js
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

const request = supertest(app);

const token = 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDFjOGQwNWY4MDUyYzYwNWQ3YTZiZDAiLCJpYXQiOjE2Nzk3NzcyNDAsImV4cCI6MTY4MDM4MjA0MH0.ndarowAe5GVY92KPIWJR9kIfNHAxqBi94N26IC9Xaa0; Path=/; Domain=localhost; HttpOnly; Expires=Sat, 25 Mar 2023 21:47:20 GMT;';

beforeAll(() => mongoose.connect('mongodb://127.0.0.1:27017/mestodb'));

afterAll(() => mongoose.disconnect());

describe('Endpoints respond to requests', () => {
  it('Responts 200 to "/users"', async () => {
    await request
      .get('/users')
      .set('Cookie', [token])
      .then((response) => {
        expect(response.status).toBe(200);
      })
      .finally(() => {
        mongoose.disconnect();
      });
  });
});
