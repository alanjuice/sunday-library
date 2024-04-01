const pool = require("../../database/pool");

async function getLogYears(req, res) {
  try {
    const result = await pool.query(
      "SELECT DISTINCT EXTRACT(YEAR FROM ISSUE_DATE) AS year FROM LOG"
    );

    const years = result.rows.map((row) => row.year);

    res.status(200).json({ status: true, years });
  } catch (error) {
    console.error("Error fetching years:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
}

module.exports = getLogYears;
