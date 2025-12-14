 const db = require('../config/db');

 
 async function createInquiry({ name, email, message, status = 'new' }) {
  const [result] = await db.query('INSERT INTO inquiries (name, email, message, status) VALUES (?, ?, ?, ?)', [
    name,
    email,
    message,
    status,
  ]);
  return getInquiry(result.insertId);

}

   async function getInquiry(id) {
  const [rows] = await db.query('SELECT * FROM inquiries WHERE id = ? LIMIT 1', [id]);
  return rows[0] || null;
}

 async function listInquiries({ page = 1, limit = 10, status, sort = 'created_at', order = 'desc' }) {

  const where = [];
  const params = [];

  if (status) {
    where.push('status = ?');
    params.push(status);
  }
  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';

  const safeSort = ['created_at', 'status', 'id'].includes(sort) ? sort : 'created_at';
  const safeOrder = String(order).toLowerCase() === 'asc' ? 'ASC' : 'DESC';

  const [[{ total }]] = await db.query(`SELECT COUNT(*) AS total FROM inquiries ${whereSql}`, params);

  const offset = (page - 1) * limit;
  const [rows] = await db.query(
    `SELECT * FROM inquiries ${whereSql} ORDER BY ${safeSort} ${safeOrder} LIMIT ? OFFSET ?`,
    [...params, Number(limit), Number(offset)]
  );

  return { items: rows, page, limit, total };
}

 async function updateInquiryStatus(id, status) {
  await db.query('UPDATE inquiries SET status = ? WHERE id = ?', [status, id]);
  return getInquiry(id);
}

 async function deleteInquiry(id) {
  const [result] = await db.query('DELETE FROM inquiries WHERE id = ?', [id]);
  return result.affectedRows > 0;
}



module.exports = { createInquiry, getInquiry, listInquiries, updateInquiryStatus, deleteInquiry };