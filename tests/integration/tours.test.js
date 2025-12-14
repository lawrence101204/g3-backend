jest.mock('../../src/config/db', () => ({
  query: jest.fn(),
}));

const request = require('supertest');
const db = require('../../src/config/db');
const app = require('../../src/app');

describe('GET /api/tours', () => {
  it('returns tours list', async () => {
    db.query
      .mockResolvedValueOnce([[{ id: 1, title: 'Tour', price: 100 }]])
      .mockResolvedValueOnce([[{ total: 1 }]]);

    const res = await request(app).get('/api/tours?page=1&limit=10');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.items).toHaveLength(1);
  });
});