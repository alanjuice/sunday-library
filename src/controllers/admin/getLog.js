const pool = require("../../database/pool");

async function getLog(req, res) {
  const { year } = req.params;
  try {
    const parsedYear = parseInt(year); // Convert year to a number
    const result = await pool.query(
      "SELECT class, ARRAY_AGG(DISTINCT book_id) AS books " +
        "FROM log " +
        "WHERE issue_date BETWEEN $1 AND $2 " +
        "GROUP BY class " +
        "ORDER BY class",
      [`${parsedYear}-01-01`, `${parsedYear + 1}-01-01`]
    );

    res.status(200).json({ status: true, data: result.rows });
  } catch (error) {
    console.log("Error", error);
    res.status(404).json({ status: false, msg: "Something went wrong" });
  }
}

module.exports = getLog;
