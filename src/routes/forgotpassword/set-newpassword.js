const pool = require("../../database/pool");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function setnewpassword(req, res) {
  const { password } = req.body;
  const { token, id } = req.params;
  try {
    if (id == "admin") {
      var SECRET = process.env.SECRET_KEY;
      const payload = jwt.verify(token, SECRET);
      const query = "update config set value=$1 where key='admin_pass'";
      const result = await pool.query(query, [password]);
      res.status(200).json({ msg: "reset password" });
    } else {
      var SECRET = process.env.SECRET_KEY + id;
      const payload = jwt.verify(token, SECRET);
      const userId = payload.id;
      //BEFORE SETTING, ENCRYPT PASSWORD
      const saltRounds = 10;
      const encryptedPassword = await bcrypt.hash(password, saltRounds);

      const queryText = `UPDATE TEACHERS SET password = $1 WHERE id = $2`;
      const result = await pool.query(queryText, [encryptedPassword, id]);
      res.status(200).json({ msg: "reset password" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "something went wrong" });
  }
}

module.exports = setnewpassword;
