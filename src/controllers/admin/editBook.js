const pool = require("../../database/pool");
const Joi = require("joi");

const bookSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string().required().max(64),
  author: Joi.string().required().max(64),
  price: Joi.number().required(),
  publisher: Joi.string().required().max(64),
  category: Joi.string().required().max(24),
});

async function updateBook(req, res) {
  try {
    const { id } = req.params;

    const { error } = bookSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ status: false, msg: error.message });
    }

    const { name, author, price, publisher, category } = req.body;

    await pool.query(
      "UPDATE books SET name = $2, author = $3, price = $4, publisher = $5, cat_id = $6 WHERE id = $1",
      [id, name, author, price, publisher, category]
    );
    console.log("Book updated " + id);
    res.status(200).json({ status: true, msg: "Book updated" });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(400).json({ status: false, msg: "Something went wrong" });
  }
}

module.exports = updateBook;
