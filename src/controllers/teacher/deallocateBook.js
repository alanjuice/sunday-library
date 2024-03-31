//return a book from student to teacher, the teacher now has the book?
const pool = require("../../database/pool");

async function deallocateBook(req, res) {
  try {
    const { bookId } = req.body;
    const teacherId = req.user.id;
    const result = await pool.query(
      "UPDATE issues SET SID = NULL WHERE bid = $1 AND return_date IS NULL and tid=$2 and sid is not null",
      [bookId, teacherId]
    );
    console.log(result.rows);
    if (result.rowCount > 0) {
      res.json({ status: true, msg: "Book deallocated successfully" });
    } else {
      res.json({
        status: false,
        msg: "Book not found",
      });
    }
  } catch (error) {
    console.error("Error returning book:", error);
    res.status(500).json({ status: false, msg: "Internal server error" });
  }
}
module.exports = deallocateBook;
