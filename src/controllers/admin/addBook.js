const pool = require("../../database/pool");
const Joi = require("joi");

const bookSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  author: Joi.string().required(),
  price: Joi.number().required(),
  publisher: Joi.string().required(),
  category: Joi.string().required(),
});

async function addBook(req, res) {
  try {
    const { error } = bookSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ status: false, msg: error.message });
    }

    const { id, name, author, price, publisher, category } = req.body;

    // Check if book already exists
    const exists = await pool.query("SELECT * FROM books WHERE id = $1", [id]);
    if (exists.rowCount !== 0) {
      return res
        .status(400)
        .json({ status: false, msg: "Book already exists" });
    }

    // Insert the book into the database
    await pool.query(
      "INSERT INTO books (id, name, author, price, publisher, category, available) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [id, name, author, price, publisher, category, true]
    );
    console.log("Book added " + id);
    res.status(200).json({ status: true, msg: "Book added" });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ status: false, msg: "Something went wrong" });
  }
}

module.exports = addBook;
