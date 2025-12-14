jest.mock('../../src/config/db', () => ({
  query: jest.fn(),
}));

const db = require('../../src/config/db');
const toursService = require('../../src/services/toursService');

describe('toursService.listTours', () => {
  it('returns paginated items + total', async () => {
    db.query
      .mockResolvedValueOnce([[{ id: 1, title: 'A', price: 100 }]]) // rows
      .mockResolvedValueOnce([[{ total: 1 }]]); // count

    const data = await toursService.listTours({ page: 1, limit: 10 });
    expect(data.items).toHaveLength(1);
    expect(data.total).toBe(1);
  });
});