const pool = require("../../database/pool");

//Get a single teacher, requires teacher id

async function getTeacherByID(req, res) {
  try {
    const { teacherId } = req.body;
    const teacherExists = await pool.query(
      "select * from teachers where id=$1",
      [teacherId]
    );

    if (teacherId.rowCount == 0) {
      res.stataus(400).json({ status: false, msg: "teacher doesn't exist" });
      return;
    }

    res.status(200).json({ status: true, data: teacherExists.rows[0] });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ status: false, msg: "Internal server error" });
  }
}

module.exports = getTeacherByID;
