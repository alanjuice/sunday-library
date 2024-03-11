//return a book from student to teacher, the teacher now has the book?
const pool = require("../../database/pool");

async function deallocateBook(req, res) {
  try {
    const { bookId } = req.body;

    const result = await pool.query(
      "UPDATE issues SET SID = NULL WHERE bid = $1 AND return_date IS NULL",
      [bookId]
    );

    if (result.rowCount > 0) {
      res.json({ status: true, msg: "Book deallocated successfully" });
    } else {
      res.json({ status: false, msg: "Book not found or already deallocated" });
    }
  } catch (error) {
    console.error("Error returning book:", error);
    res.status(500).json({ status: false, msg: "Internal server error" });
  }
}
module.exports = deallocateBook;
