jest.mock('../../src/config/db', () => ({
  query: jest.fn(),
}));

const request = require('supertest');
const db = require('../../src/config/db');
const app = require('../../src/app');

describe('GET /api/inquiries', () => {
  it('returns inquiry list', async () => {
    db.query
      .mockResolvedValueOnce([[{ id: 1, status: 'new' }]])
      .mockResolvedValueOnce([[{ total: 1 }]]);

    const res = await request(app).get('/api/inquiries?page=1&limit=10');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});

describe('POST /api/inquiries', () => {
  it('creates inquiry', async () => {
    // INSERT result
    db.query
      .mockResolvedValueOnce([{ insertId: 99 }])
      .mockResolvedValueOnce([[{ id: 99, name: 'A', email: 'a@a.com', message: 'hello', status: 'new' }]]);

    const res = await request(app).post('/api/inquiries').send({
      name: 'A',
      email: 'a@a.com',
      message: 'hello there',
    });

    expect([200, 201]).toContain(res.statusCode);
    expect(res.body.success).toBe(true);
  });
});
