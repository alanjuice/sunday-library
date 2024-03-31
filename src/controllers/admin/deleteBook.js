const pool = require("../../database/pool");

//Delete a single book, requires book id

async function deleteBook(req, res) {
  try {
    const { id } = req.params;

    const bookExists = await pool.query("select * from books where id=$1", [
      id,
    ]);

    if (bookExists.rowCount == 0) {
      res.status(400).json({ status: false, msg: "Book doesn't exist" });
      return;
    }

    await pool.query("update books set status = false where id=$1", [id]);

    res.status(200).json({ status: true, msg: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ status: false, msg: "Internal server error" });
  }
}

module.exports = deleteBook;
