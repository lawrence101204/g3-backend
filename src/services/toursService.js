const db = require('../config/db');

async function listTours({ page = 1, limit = 10, minPrice, maxPrice }) {
  const where = [];
  const params = [];

  if (minPrice !== undefined) {
    where.push('price >= ?');
    params.push(Number(minPrice));
  }

  if (maxPrice !== undefined) {
    where.push('price <= ?');
    params.push(Number(maxPrice));
  }

  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';

  const [[{ total }]] = await db.query(
    `SELECT COUNT(*) AS total FROM tours ${whereSql}`,
    params
  );

  const offset = (page - 1) * limit;

  const [rows] = await db.query(
    `
    SELECT
      id,
      name,
      type,
      locations,
      duration,
      price,
      inclusions,
      details
    FROM tours
    ${whereSql}
    ORDER BY id DESC
    LIMIT ? OFFSET ?
    `,
    [...params, Number(limit), Number(offset)]
  );

  return { items: rows, page, limit, total };
}

async function getTour(id) {
  const [rows] = await db.query(
    `
    SELECT
      id,
      name,
      type,
      locations,
      duration,
      price,
      inclusions,
      details
    FROM tours
    WHERE id = ?
    LIMIT 1
    `,
    [id]
  );

  return rows[0] || null;
}

async function createTour({ name, type, locations, duration, price, inclusions, details }) {
  const [result] = await db.query(
    `
    INSERT INTO tours
      (name, type, locations, duration, price, inclusions, details)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [
      name,
      type || null,
      locations || null,
      duration || null,
      price,
      inclusions || null,
      details || null,
    ]
  );

  return getTour(result.insertId);
}

async function updateTour(id, data) {
  const fields = [];
  const params = [];

  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) {
      fields.push(`${key} = ?`);
      params.push(value);
    }
  }

  if (!fields.length) return getTour(id);

  params.push(id);

  await db.query(
    `UPDATE tours SET ${fields.join(', ')} WHERE id = ?`,
    params
  );

  return getTour(id);
}

async function deleteTour(id) {
  const [result] = await db.query('DELETE FROM tours WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

module.exports = {
  listTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
};