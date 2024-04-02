const pool = require("../../database/pool");

//get all books
async function getAvailableBooks(req, res) {
  try {
    const result = await pool.query(
      "select * from books where status=true and available=true"
    );
    res.status(200).json({ status: true, data: result.rows });
  } catch (error) {
    console.log("Error", error);
    res.status(404).json({ status: false, msg: "Something went wrong" });
  }
}

module.exports = getAvailableBooks;
