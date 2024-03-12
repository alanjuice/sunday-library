const pool = require("../../database/pool");

//Get a specific book id from specifying in req params
async function getBooksByCat(req, res) {
  try {
    const category = req.params.category;
    const result = await pool.query("select * from books where CATEGORY=$1", [
      category,
    ]);
    if (result.rows) {
      res.json({ status: true, data: result.rows });
    } else res.status(404).json({ status: false, msg: "book doesn't exists" });
  } catch (error) {
    res.status(404).json({ status: false, msg: "Something went wrong" });
  }
}

module.exports = getBooksByCat;
