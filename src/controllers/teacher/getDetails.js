const pool = require("../../database/pool");

//gets teacher details
async function getDetails(req, res) {
  try {
    const result = await pool.query(
      "select name,classname,email from teachers where id = $1",
      [req.user.id]
    );
    const countQuery = `
  SELECT 
    (SELECT COUNT(*) FROM students WHERE classname = $1) as student_count,
    (SELECT COUNT(*) FROM issues WHERE tid = $2 AND return_date IS NULL AND sid IS NOT NULL) as allocated_books_count;
`;
    const count = await pool.query(countQuery, [
      req.user.classname,
      req.user.id,
    ]);
    const finalData = { ...count.rows[0], ...result.rows[0] };
    res.status(200).json(finalData);
  } catch (error) {
    console.log("Error", error);
    res.status(404).json({ status: false, msg: "Internal Server Error" });
  }
}

module.exports = getDetails;
