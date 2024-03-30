const pool = require("../../database/pool");

async function updateStudent(req, res) {
  try {
    const { id } = req.params;
    const { name, classname } = req.body;

    await pool.query("UPDATE STUDENT SET name = $2, class = $3 WHERE id = $1", [
      id,
      name,
      classname,
    ]);
    console.log("Student updated " + id);
    res.status(200).json({ status: true, msg: "Student updated" });
  } catch (error) {
    console.error("Error updating Student:", error);
    res.status(400).json({ status: false, msg: "Something went wrong" });
  }
}

module.exports = updateStudent;
