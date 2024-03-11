//returns all the books the teacher has i.e with teacher and his/her stgudent
const pool = require("../../database/pool");

async function getTeacherBooks(req, res) {
  try {
    const teacherId = req.user.id;
    const results = await pool.query("SELECT bid FROM issues WHERE tid = $1 and return_date is null", [
      teacherId,
    ]);

    const books = results.rows;

    res.json(books);
  } catch (error) {
    console.error("Error fetching teacher's books:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = getTeacherBooks;
