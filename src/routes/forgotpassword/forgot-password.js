const jwt = require("jsonwebtoken");
const pool = require("../../database/pool");
const sendEmail = require("../../utils/sendEmail");

async function forgotpassword(req, res) {
  try {
    const { id } = req.body;
    const queryText = `SELECT * FROM TEACHERS WHERE id = $1`;
    const teacher = await pool.query(queryText, [id]);
    if (teacher.rowCount == 0) {
      res.status(400).json({ msg: "teacher doesn't exist" });
      return;
    }
    const teacherDetails = teacher.rows[0];
    const SECRET = process.env.SECRET_KEY + teacherDetails.id;
    const payload = {
      email: teacherDetails.email,
      id: teacherDetails.id,
    };

    const token = jwt.sign(payload, SECRET, { expiresIn: "100s" });
    console.log(token);
    const email = teacherDetails.email;
    const link =
      process.env.URL + `/resetpassword/${teacherDetails.id}/${token}`;
    console.log(link);
    sendEmail(email, link);
    res.status(200).json({ msg: "reset password link sent" });
  } catch (error) {
    console.log(error);
  }
}
module.exports = forgotpassword;
