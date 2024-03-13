const pool = require("../../database/pool");
const jwt = require("jsonwebtoken");

//Login for admin
async function loginHandler(req, res) {
  const password = req.body.password;

  try {
    const secret = process.env.SECRET_KEY;
    const result = await pool.query(
      "select value from config where key = 'admin_pass'"
    );
    if (result.rows[0].value == password) {
      const token = jwt.sign(
        {
          type: "Admin",
        },
        secret
      );
      res.setHeader("x-authtoken", token);
      res.status(200).json({
        status: true,
        msg: "admin authenticated.",
      });
      return;
    } else {
      res.status(404).json({
        status: false,
        msg: "invalid password",
      });
    }
  } catch (error) {
    res.status(400).json({ status: false, msg: "Something went wrong" });
  }
}

module.exports = loginHandler;
