const db = require('../config/db');

exports.listTours = async ({ page, limit, minPrice, maxPrice }) => {
  const offset = (page - 1) * limit;

  const conditions = [];
  const values = [];

  if (minPrice) {
    conditions.push('price >= ?');
    values.push(minPrice);
  }

  if (maxPrice) {
    conditions.push('price <= ?');
    values.push(maxPrice);
  }

  const whereClause = conditions.length
    ? `WHERE ${conditions.join(' AND ')}`
    : '';

  // 🔹 paginated query
  const [rows] = await db.query(
    `
    SELECT *
    FROM tours
    ${whereClause}
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
    `,
    [...values, limit, offset]
  );

  // 🔹 total count
  const [[{ total }]] = await db.query(
    `
    SELECT COUNT(*) AS total
    FROM tours
    ${whereClause}
    `,
    values
  );

  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    items: rows,
  };
};
