const pool = require("../../database/pool");
const Joi = require("joi");

const studentSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  classname: Joi.string().required(),
});

async function addStudent(req, res) {
  try {
    const { error } = studentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ status: false, msg: error.message });
    }

    const { id, name, classname } = req.body;

    // Check if student already exists
    const exists = await pool.query("SELECT * FROM students WHERE id = $1", [
      id,
    ]);
    if (exists.rowCount !== 0) {
      return res.status(400).json({ status: false, msg: "ID already exists" });
    }

    // Insert the student into the database
    await pool.query("INSERT INTO students  VALUES ($1, $2, $3)", [
      id,
      name,
      classname,
    ]);

    res.status(200).json({ status: true, msg: "student added" });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ status: false, msg: "Something went wrong" });
  }
}

module.exports = addStudent;