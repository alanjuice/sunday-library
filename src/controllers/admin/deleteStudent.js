const pool = require("../../database/pool");

async function deleteStudent(req, res) {
  try {
    const { id } = req.params;
    const studentExists = await pool.query(
      "select * from students where id=$1",
      [id]
    );

    if (studentExists.rowCount == 0) {
      res.stataus(400).json({ status: false, msg: "Student doesn't exist" });
      return;
    }

    await pool.query("update students set status=false where id=$1", [id]);

    res.status(200).json({ status: true, msg: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ status: false, msg: "Internal server error" });
  }
}

module.exports = deleteStudent;
