const pool = require("../../database/pool");

async function viewAllocation(req, res) {
  try {
    const teacherId = req.user.id;
    const results = await pool.query(
      "SELECT s.NAME AS student_name, b.NAME AS book_name FROM ISSUES i JOIN STUDENTS s ON i.SID = s.ID JOIN BOOKS b ON i.BID = b.ID WHERE i.RETURN_DATE IS NULL AND i.TID = $1;",
      [teacherId]
    );

    const books = results.rows;

    res.status(200).json({ status: true, data: books });
  } catch (error) {
    console.error("Error fetching teacher's books:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = viewAllocation;
