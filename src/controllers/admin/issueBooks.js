const pool = require("../../database/pool");

//Issue multiple books to a teacher, requires teacher id and list of books to issue
async function issueBooks(req, res) {
  console.log(req.body);
  const { books, teacherId } = req.body;
  try {
    const results = await pool.query("select * from teachers where id=$1", [
      teacherId,
    ]);
    if (results.rowCount == 0) {
      res.status(400).json({ status: false, msg: "teacher doesn't exist" });
    }
    const classname = results.rows[0].classname;
    await Promise.all(
      books.map(async (book) => {
        //Insert into issue table
        await pool.query(
          "INSERT INTO issues (tid, bid, borrow_date) VALUES ($1, $2, 'NOW()')",
          [teacherId, book]
        );
        await pool.query("update books set available=false where id=$1", [
          book,
        ]);
        //Insert the issue into logs
        await pool.query("INSERT INTO LOG VALUES ($1,'NOW()',$2)", [
          classname,
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

module.exports = issueBooks;
