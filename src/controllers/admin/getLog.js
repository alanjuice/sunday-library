const pool = require("../../database/pool");

async function getLog(req, res) {
  const { year, classname } = req.body;
  try {
    const result = await pool.query(
      "select * from issues where classname=$1 and $1 between return_date and issue_date"
    );
    res.status(200).json({ status: true, data: result.rows });
  } catch (error) {
    console.log("Error", error);
    res.status(404).json({ status: false, msg: "Something went wrong" });
  }
}

module.exports = getLog;
