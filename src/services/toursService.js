const db = require('../config/db');

/**
 * List tours with pagination and optional price filtering
 */
async function listTours({ page = 1, limit = 10, minPrice, maxPrice }) {
  // ✅ Ensure numbers (important)
  page = Number(page);
  limit = Number(limit);

  const where = [];
  const params = [];

  // ✅ Validate numeric filters
  if (minPrice !== undefined && !Number.isNaN(Number(minPrice))) {
    where.push('price >= ?');
    params.push(Number(minPrice));
  }

  if (maxPrice !== undefined && !Number.isNaN(Number(maxPrice))) {
    where.push('price <= ?');
    params.push(Number(maxPrice));
  }

  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';

  // ✅ Total count (used for pagination metadata)
  const [[{ total }]] = await db.query(
    `SELECT COUNT(*) AS total FROM tours ${whereSql}`,
    params
  );

  const offset = (page - 1) * limit;

  // ✅ Paginated query
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
    [...params, limit, offset]
  );

  return {
    items: rows,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
}

/**
 * Get single tour
 */
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
    [Number(id)]
  );

  return rows[0] || null;
}

/**
 * Create tour
 */
async function createTour({
  name,
  type,
  locations,
  duration,
  price,
  inclusions,
  details,
}) {
  const [result] = await db.query(
    `
    INSERT INTO tours
      (name, type, locations, duration, price, inclusions, details)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [
      name,
      type ?? null,
      locations ?? null,
      duration ?? null,
      price,
      inclusions ?? null,
      details ?? null,
    ]
  );

  return getTour(result.insertId);
}

/**
 * Update tour
 */
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

  params.push(Number(id));

  await db.query(
    `UPDATE tours SET ${fields.join(', ')} WHERE id = ?`,
    params
  );

  return getTour(id);
}

/**
 * Delete tour
 */
async function deleteTour(id) {
  const [result] = await db.query(
    'DELETE FROM tours WHERE id = ?',
    [Number(id)]
  );

  return result.affectedRows > 0;
}

module.exports = {
  listTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
};
