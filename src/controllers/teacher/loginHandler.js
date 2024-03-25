const pool = require("../../database/pool");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const teacherLoginSchema = Joi.object({
  id: Joi.string().required(),
  password: Joi.string().required(),
});

// Login handler for teacher
async function loginHandler(req, res) {
  try {
    const { error } = teacherLoginSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ status: false, msg: error.details[0].message });
    }

    const id = req.body.id;
    const password = req.body.password;

    const result = await pool.query("SELECT * FROM teachers WHERE id = $1", [
      id,
    ]);

    if (result.rowCount == 0) {
      res.status(404).json({ status: false, msg: "User doesn't exist" });
      return;
    }

    const hashedPassword = result.rows[0].password;
    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (passwordMatch) {
      const cls = result.rows[0].classname;
      const name = result.rows[0].name;
      // Generating JWT token
      const token = jwt.sign(
        { type: "Teacher", id: id, classname: cls, name: name },
        "hello"
      );
      console.log(token);
      res.setHeader("x-authtoken", token);
      res.status(200).json({ status: true, msg: "User authenticated" });
      return;
    } else {
      res.status(404).json({ status: false, msg: "Invalid password" });
      return;
    }
  } catch (error) {
    console.error("Error in teacher login:", error);
    res.status(500).json({ status: false, msg: "Something went wrong" });
  }
}

module.exports = loginHandler;
