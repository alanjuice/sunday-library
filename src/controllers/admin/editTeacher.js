const pool = require("../../database/pool");
const Joi = require("joi");

const teacherSchema = Joi.object({
  name: Joi.string().required().max(64),
  email: Joi.string().required().max(32),
  classname: Joi.string().required().max(3),
});

async function editTeacher(req, res) {
  try {
    const { id } = req.params;

    const { error } = teacherSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ status: false, msg: error.message });
    }

    const { name, classname, email } = req.body;

    await pool.query(
      "UPDATE TEACHERS SET name = $2, classname = $3,email = $4 WHERE id = $1",
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
