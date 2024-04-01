const pool = require("../../database/pool");

async function getStats(req, res) {
  try {
    const result = await pool.query(`WITH counts AS (
        SELECT
          (SELECT COUNT(*) FROM books WHERE available = false and status = true) AS issued_book_count,
          (SELECT COUNT(*) FROM books WHERE status = true) AS total_book_count,
          (SELECT COUNT(*) FROM students WHERE status = true) AS student_count,
          (SELECT COUNT(*) FROM teachers WHERE status = true) AS teacher_count
      )
      SELECT * FROM counts;
    `);
    const stats = result.rows[0]; // Extracting the first row
    res.status(200).json({ status: true, data: stats });
  } catch (error) {
    console.log("Error", error);
    res.status(404).json({ status: false, msg: "Something went wrong" });
  }
}

module.exports = getStats;
