jest.mock('../../src/config/db', () => ({
  query: jest.fn(),
}));

const request = require('supertest');
const db = require('../../src/config/db');
const app = require('../../src/app');

describe('POST /api/auth/login', () => {
  it('fails on invalid credentials', async () => {
    db.query.mockResolvedValueOnce([[]]); // no admin found

    const res = await request(app).post('/api/auth/login').send({ username: 'x', password: 'password123' });
    expect([400, 401, 422]).toContain(res.statusCode); // depends on validators/length
  });
});
