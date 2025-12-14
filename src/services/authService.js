const db = require('../config/db');

async function findAdminByUsername(username) {
  const [rows] = await db.query(
    'SELECT id, username, password AS passwordHash FROM admin WHERE username = ? LIMIT 1',
    [username]
  );
  return rows[0] || null;
}

module.exports = { findAdminByUsername };
