const pool = require("../../database/pool");

//TODO: autogenerate bookid based on category

async function addBook(req, res) {
  try {
    const { id, name, author, price, publisher, category } = req.body;

    // const id = req.body.id;
    // const name = req.body.name;
    // const author = req.body.author;
    // const price = req.body.price;
    // const publisher = req.body.publisher;

    if (!id || !name || !author || !price || !publisher || !category) {
      res.status(400).json({ status: false, msg: "missing fields" });
      return;
    }

    //check if book already exists or not
    const exists = await pool.query("select * from books where id=$1", [id]);
    if (exists.rowCount != 0) {
      res.status(400).json({ status: false, msg: "book already exists" });
      return;
    }

    const result = await pool.query(
      "INSERT INTO BOOKS VALUES($1,$2,$3,$4,$5,$6,$7)",
      [id, name, author, price, publisher, category, true]
    );
    res.status(200).json({ status: true, msg: "book added" });
  } catch {
    res.json({ status: false, msg: "Something went wrong" });
  }
}

module.exports = addBook;
