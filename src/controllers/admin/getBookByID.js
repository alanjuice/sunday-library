const pool = require("../../database/pool");

//Gets a single book, requires book id

async function getBookIdId(req, res) {
  try {
    const { id } = req.params;

    const bookExists = await pool.query("select * from books where id=$1", [
      id,
    ]);
    console.log(bookExists.rows);
    if (bookExists.rowCount == 0) {
      res.status(400).json({ status: false, msg: "Book doesn't exist" });
      return;
    }

    res.status(200).json({ status: true, data: bookExists.rows[0] });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ status: false, msg: "Internal server error" });
  }
}

module.exports = getBookIdId;
