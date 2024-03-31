const pool = require("../../database/pool");

async function getTeachers(req, res) {
  try {
    const result = await pool.query(
      "select name,email,class from teachers where status=true"
    );
    res.status(200).json({ status: true, data: result.rows });
  } catch (error) {
    console.log("Error", error);
    res.status(404).json({ status: false, msg: "Something went wrong" });
  }
}

module.exports = getTeachers;
