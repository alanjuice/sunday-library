const pool = require("../../database/pool");

//gets all students of the teachers class
async function getStudents(req, res) {
  try {
    const cls = req.user.classname;
    console.log(cls);
    const result = await pool.query(
      "select * from students where classname = $1 and status=true",
      [cls]
    );
    console.log(result);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(404).json({ status: false, msg: "s" });
  }
}

module.exports = getStudents;
