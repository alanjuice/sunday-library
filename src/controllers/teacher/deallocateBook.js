const pool = require("../../database/pool");

async function deallocateBook(req, res) {
  try {
    const { bookIds } = req.body;
    const teacherId = req.user.id;
    console.log(req.body);
    const deallocatePromises = bookIds.map(async (bookId) => {
      const result = await pool.query(
        "UPDATE issues SET SID = NULL WHERE bid = $1 AND return_date IS NULL and tid=$2 and sid is not null",
        [bookId, teacherId]
      );
      return result.rowCount;
    });

    const results = await Promise.all(deallocatePromises);
    const totalUpdatedRows = results.reduce(
      (acc, rowCount) => acc + rowCount,
      0
    );

    if (totalUpdatedRows > 0) {
      res.json({ status: true, msg: "Books deallocated successfully" });
    } else {
      res.json({
        status: false,
        msg: "No books found to deallocate",
      });
    }
  } catch (error) {
    console.error("Error returning book:", error);
    res.status(500).json({ status: false, msg: "Internal server error" });
  }
}
module.exports = deallocateBook;
