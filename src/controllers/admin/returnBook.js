const pool = require("../../database/pool");

//Return a single book from the teacher, requires book id
//TODO: maybe delete the row after return or not ?
async function returnBook(req, res) {
  try {
    const { bookId } = req.body;

    const result = await pool.query(
      "UPDATE issues SET return_date = 'dd' WHERE bid = $1 AND return_date IS NULL",
      [bookId]
    );

    if (result.rowCount > 0) {
      res.json({ status: true, msg: "Book returned successfully" });
    } else {
      res.json({ status: false, msg: "Book not found or already returned" });
    }
  } catch (error) {
    console.error("Error returning book:", error);
    res.status(500).json({ status: false, msg: "Internal server error" });
  }
}

module.exports = returnBook;
