const pool = require("../../database/pool");

//gets all books that has been borrowed
async function getIssuedBooks(req, res) {
  try {
    const result = await pool.query(
      "select sid,tid,bid from issues where return_date is null"
    );
    res.status(200).json({ status: true, data: result.rows });
  } catch (error) {
    console.log("Error", error);
    res.status(404).json({ status: false, msg: "Something went wrong" });
  }
}

module.exports = getIssuedBooks;
