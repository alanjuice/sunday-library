const pool = require("../../database/pool");

//get all books
async function getBooks(req, res) {
  try {
    const result = await pool.query("select * from books");
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(404).json({ status: false, msg: "Something went wrong" });
  }
}

module.exports = getBooks;
