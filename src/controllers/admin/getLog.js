const pool = require("../../database/pool");

async function getLog(req, res) {
  const { year } = req.params;
  try {
    const parsedYear = parseInt(year); // Convert year to a number
    const result = await pool.query(
      "SELECT l.class, ARRAY_AGG(DISTINCT b.name) AS books " +
        "FROM log l " +
        "JOIN books b ON l.book_id = b.id " + // Assuming there's a books table with book names
        "WHERE l.issue_date BETWEEN $1 AND $2 " +
        "GROUP BY l.class " +
        "ORDER BY l.class",
      [`${parsedYear}-01-01`, `${parsedYear + 1}-01-01`]
    );

    res.status(200).json({ status: true, data: result.rows });
  } catch (error) {
    console.log("Error", error);
    res.status(404).json({ status: false, msg: "Something went wrong" });
  }
}

module.exports = getLog;
