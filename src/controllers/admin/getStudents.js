const pool = require("../../database/pool");

async function getStudents(req, res) {
  try {
    const result = await pool.query("select * from students where status=true");
    res.status(200).json({ status: true, data: result.rows });
  } catch (error) {
    console.log("Error", error);
    res.status(404).json({ status: false, msg: "Something went wrong" });
  }
}

module.exports = getStudents;
