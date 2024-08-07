const pool = require("../../database/pool");

//Get books of the specified category
//NOT USED
async function getBooksByCat(req, res) {
  try {
    const category = req.params.category;
    const result = await pool.query(
      "select * from books where CATEGORY=$1 and status=true",
      [category]
    );
    if (result.rows) {
      res.json({ status: true, data: result.rows });
    } else
      res.status(404).json({ status: false, msg: "category doesn't exists" });
  } catch (error) {
    console.log("Error", error);
    res.status(404).json({ status: false, msg: "Something went wrong" });
  }
}

module.exports = getBooksByCat;
