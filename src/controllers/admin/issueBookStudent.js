const pool = require("../../database/pool");

async function issueBooksStudent(req, res) {
  console.log(req.body);
  const { books, studentId } = req.body;
  try {
    const results = await pool.query("select * from students where id=$1", [
      studentId,
    ]);
    if (results.rowCount == 0) {
      res.status(400).json({ status: false, msg: "student doesn't exist" });
    }
    await Promise.all(
      books.map(async (book) => {
        //Insert into issue table
        await pool.query(
          "INSERT INTO issues (sid, bid, borrow_date) VALUES ($1, $2, 'NOW()')",
          [studentId, book]
        );
        await pool.query("update books set available=false where id=$1", [
          book,
        ]);
      })
    );
    res.json({ status: true, msg: "Books issued" });
  } catch (error) {
    console.error("Error issuing books:", error);
    res.status(500).json({ status: false, msg: "Internal server error" });
  }
}

module.exports = issueBooksStudent;
