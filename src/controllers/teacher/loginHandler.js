const pool = require("../../database/pool");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//Login handler for teacher
async function loginHandler(req, res) {
  const id = req.body.id;
  const password = req.body.password;
  try {
    const result = await pool.query("select * from teachers where id = $1", [
      id,
    ]);

    if (result.rowCount == 0) {
      res.status(404).json({ status: false, msg: "user doesn't exist" });
      return;
    }
    const hashedPassword = result.rows[0].password;
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    if (passwordMatch) {
      const cls = result.rows[0].class;

      //Sending back authtoken in the header
      const key = jwt.sign({ type: "Teacher", id: id, class: cls }, "hello");
      res.set("x-authtoken", key);
      res.status(200).json({ status: true, msg: "user authenticated" });

      return;
    } else {
      res.status(404).json({ status: false, msg: "password invalid" });
      return;
    }
  } catch (error) {
    res.status(400).json({ status: false, msg: "error" });
  }
}

module.exports = loginHandler;
