const pool = require("../../database/pool");

async function addExistingBook(req, res) {
  try {
    const { id } = req.body;

    if (!id) {
      res.status(400).json({ status: false, msg: "please provide a id" });
    }

    // Check if the book with the given ID exists
    const exists = await pool.query("SELECT * FROM books WHERE id = $1", [id]);
    if (exists.rowCount == 0) {
      return res.status(400).json({ status: false, msg: "Book doesn't exist" });
    }

    // Count the number of existing books with the same ID prefix
    const existingCountResult = await pool.query(
      "SELECT COUNT(*) FROM books WHERE id LIKE $1",
      [`${id}%`]
    );
    const existingCount = parseInt(existingCountResult.rows[0].count);

    // Convert the count to a letter
    const suffixLetter = String.fromCharCode(96 + existingCount);

    const newId = id + suffixLetter;

    // details of the existing book
    const oldBookDetails = exists.rows[0];

    // Insert the new book with the modified ID
    await pool.query(
      "INSERT INTO books (id, name, author, price, publisher, cat_id, available,status) VALUES ($1, $2, $3, $4, $5, $6, $7,$8)",
      [
        newId,
        oldBookDetails.name,
        oldBookDetails.author,
        oldBookDetails.price,
        oldBookDetails.publisher,
        oldBookDetails.cat_id,
        true,
        true,
      ]
    );

    console.log("Book added with ID: " + newId);
    res.status(200).json({ status: true, msg: "Book added", newId });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ status: false, msg: "Something went wrong" });
  }
}

module.exports = addExistingBook;
