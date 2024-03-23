const pool = require("../../database/pool");

async function viewAllocation(req, res) {
  try {
    const teacherId = req.user.id;
    const results = await pool.query(
      "select sid,bid from issues where return_date is null and tid=$1",
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
