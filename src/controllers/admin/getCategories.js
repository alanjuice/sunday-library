const pool = require("../../database/pool");

//gets all book category
async function getCategories(req, res) {
  try {
    const result = await pool.query("select distinct CATEGORY from books");
    const categoryNames = result.rows.map(
      (categoryObj) => categoryObj.category
    );
    res.status(200).json(categoryNames);
  } catch (error) {
    res.status(404).json({ status: false, msg: "Something went wrong" });
  }
}

module.exports = getCategories;
