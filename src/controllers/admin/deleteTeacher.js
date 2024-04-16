

const pool = require("../../database/pool");

//Delete a single teacher, requires book id

async function deleteTeacher(req, res) {
  try {
    const { id } = req.params;
    const teacherExists = await pool.query(
      "select * from teachers where id=$1",
      [id]
    );

    if (teacherExists.rowCount == 0) {
      res.stataus(400).json({ status: false, msg: "Teacher doesn't exist" });
      return;
    }

    await pool.query("update teachers set status=false where id=$1", [id]);

    res.status(200).json({ status: true, msg: "Teacher deleted successfully" });
  } catch (error) {
    console.error("Error deleting teacher:", error);
    res.status(500).json({ status: false, msg: "Internal server error" });
  }
}

module.exports = deleteTeacher;
