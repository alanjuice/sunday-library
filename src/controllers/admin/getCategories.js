const pool = require("../../database/pool");

//gets all book category
async function getCategories(req, res) {
  try {
    const result = await pool.query("select id,name from book_cat");
    res.status(200).json({ status: true, data: result.rows });
  } catch (error) {
    res.status(404).json({ status: false, msg: "Something went wrong" });
  }
}

module.exports = getCategories;
