const pool = require("../../database/pool");
//Search books via both ID and BookName

async function searchBook(req, res) {
  try {
    const { term } = req.params;
    console.log(term);
    const queryText = "SELECT * FROM books WHERE id ILIKE $1 OR name ILIKE $1";

    const result = await pool.query(queryText, [`%${term}%`]);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error searching for books:", error);
    res.status(500).json({ status: false, msg: "Something went wrong" });
  }
}

module.exports = searchBook;
