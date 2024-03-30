const pool = require("../../database/pool");

async function editTeacher(req, res) {
  try {
    const { id } = req.params;
    const { name, classname, email } = req.body;

    await pool.query(
      "UPDATE TEACHERS SET name = $2, class = $3,email = $4 WHERE id = $1",
      [id, name, classname, email]
    );
    console.log("Teacher updated " + id);
    res.status(200).json({ status: true, msg: "Teacher updated" });
  } catch (error) {
    console.error("Error updating Student:", error);
    res.status(400).json({ status: false, msg: "Something went wrong" });
  }
}

module.exports = editTeacher;
