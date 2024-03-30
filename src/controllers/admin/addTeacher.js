const pool = require("../../database/pool");
const Joi = require("joi");
const bcrypt = require("bcrypt");

//Teacher model
//password strentght check? mno size check
const teacherSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required().max(64),
  email: Joi.required(),
  classname: Joi.string().required().max(3),
  password: Joi.string().required(),
});

async function addTeacher(req, res) {
  try {
    const { error } = teacherSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ status: false, msg: error.message });
    }

    const { id, name, email, classname, password } = req.body;

    // Check if teacher already exists
    const exists = await pool.query("SELECT * FROM teachers WHERE id = $1", [
      id,
    ]);

    if (exists.rowCount !== 0) {
      return res
        .status(400)
        .json({ status: false, msg: "Teacher already exists" });
    }

    // Encrypting password
    const saltRounds = 10;
    const encryptedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the teacher into the database
    await pool.query(
      "INSERT INTO teachers (id, name, email, classname, password) VALUES ($1, $2, $3, $4, $5)",
      [id, name, email, classname, encryptedPassword]
    );
    console.log("Teacher added " + id);
    res.status(200).json({ status: true, msg: "Teacher added" });
  } catch (error) {
    console.error("Error adding teacher:", error);
    res.status(500).json({ status: false, msg: "Something went wrong" });
  }
}

module.exports = addTeacher;
