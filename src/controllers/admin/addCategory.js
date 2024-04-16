const Joi = require("joi");
const pool = require("../../database/pool");

const categorySchema = Joi.object({
  id: Joi.string().required().max(5),
  category_name: Joi.string().required().max(32),
});

async function addCategory(req, res) {
  try {
    
    const { error } = categorySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ status: false, msg: error.message });
    }

    const { id, category_name } = req.body;

    // Check if category already exists
    const exists = await pool.query("SELECT * FROM BOOK_CAT WHERE id = $1", [
      id,
    ]);
    if (exists.rowCount !== 0) {
      return res
        .status(400)
        .json({ status: false, msg: "category already exists" });
    }

    // Insert the category into the database
    await pool.query("INSERT INTO BOOK_CAT VALUES ($1, $2,0)", [
      id,
      category_name,
    ]);
    console.log("CATEGORY added " + id);
    res.status(200).json({ status: true, msg: "Category added" });
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ status: false, msg: "Something went wrong" });
  }
}

module.exports = addCategory;
