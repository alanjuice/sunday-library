const pool = require("../../database/pool");

async function getLog(req, res) {
  const { year } = req.params;
  try {
    //not working i guess

    const result = await pool.query(
      "SELECT * FROM log WHERE issue_date BETWEEN $1 AND $2",
      [`${year}-01-01`, `${year + 1}-01-01`]
    );
    res.status(200).json({ status: true, data: result.rows });
  } catch (error) {
    console.log("Error", error);
    res.status(404).json({ status: false, msg: "Something went wrong" });
  }
}

module.exports = getLog;
