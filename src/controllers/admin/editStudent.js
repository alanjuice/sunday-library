const pool = require("../../database/pool");
const Joi = require("joi");

const studentSchema = Joi.object({
  name: Joi.string().required().max(64),
  classname: Joi.string().required().max(3),
});

async function updateStudent(req, res) {
  try {
    const { id } = req.params;

    const { error } = studentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ status: false, msg: error.message });
    }
    
    const { name, classname } = req.body;

    await pool.query(
      "UPDATE STUDENTS SET name = $2, classname = $3 WHERE id = $1",
      [id, name, classname]
    );
    console.log("Student updated " + id);
    res.status(200).json({ status: true, msg: "Student updated" });
  } catch (error) {
    console.error("Error updating Student:", error);
    res.status(400).json({ status: false, msg: "Something went wrong" });
  }
}

module.exports = updateStudent;
