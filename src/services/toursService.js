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
  const offset = (Number(page) - 1) * Number(limit);

  const [rows] = await db.query(
    `SELECT * FROM tours ${whereSql} ORDER BY id DESC LIMIT ? OFFSET ?`,
    [...params, Number(limit), offset]
  );

  const [countRows] = await db.query(`SELECT COUNT(*) as total FROM tours ${whereSql}`, params);
  return { items: rows, page: Number(page), limit: Number(limit), total: countRows[0].total };
}

async function getTour(id) {
  const [rows] = await db.query('SELECT * FROM tours WHERE id = ? LIMIT 1', [Number(id)]);
  return rows[0] || null;
}

async function createTour(data) {
  const { title, location, duration, price, inclusions, details } = data;
  const [result] = await db.query(
    'INSERT INTO tours (title, location, duration, price, inclusions, details) VALUES (?, ?, ?, ?, ?, ?)',
    [title, location || null, duration || null, price, inclusions || null, details || null]
  );
  return getTour(result.insertId);
}

async function updateTour(id, data) {
  const fields = [];
  const params = [];

  for (const [key, value] of Object.entries(data)) {
    if (value === undefined) continue;
    fields.push(`${key} = ?`);
    params.push(value);
  }

  if (!fields.length) return getTour(id);

  params.push(Number(id));
  await db.query(`UPDATE tours SET ${fields.join(', ')} WHERE id = ?`, params);

  return getTour(id);
}

 async function deleteTour(id) {
  await db.query('DELETE FROM tours WHERE id = ?', [Number(id)]);
  return true;
}

