const pool = require("../../database/pool");

async function getAllocatedBooks(req, res) {
  try {
    const teacherId = req.user.id;
    const results = await pool.query(
      "SELECT * FROM books WHERE id IN (SELECT bid FROM issues WHERE tid = $1 AND return_date IS NULL AND sid IS NOT NULL)",
      [teacherId]
    );

    const books = results.rows;

    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = getAllocatedBooks;
