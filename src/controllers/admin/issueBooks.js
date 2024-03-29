const pool = require("../../database/pool");

//Issue multiple books to a teacher, requires teacher id and list of books to issue
async function issueBooks(req, res) {
  const { books, teacherId } = req.body;
  try {
    await Promise.all(
      books.map(async (book) => {
        await pool.query(
          "INSERT INTO issues (tid, bid, borrow_date) VALUES ($1, $2, $3, 'NOW()')",
          [teacherId, book]
        );
      })
    );

    res.json({ status: true, msg: "Books issued" });
  } catch (error) {
    console.error("Error issuing books:", error);
    res.status(500).json({ status: false, msg: "Internal server error" });
  }
}

module.exports = issueBooks;
