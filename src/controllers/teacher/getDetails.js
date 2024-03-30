const pool = require("../../database/pool");

//gets teacher details
async function getDetails(req, res) {
  try {
    const result = await pool.query(
      "select name,classname,email from teachers where id = $1",
      [req.user.id]
    );
    console.log(result.rows);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.log("Error", error);
    res.status(404).json({ status: false, msg: "Internal Server Error" });
  }
}

module.exports = getDetails;
