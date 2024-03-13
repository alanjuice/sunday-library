//Allocate a book to a student, requires bookid and student id
//or allocate multiple book to multiple students at same time, one html request only needed
const pool = require("../../database/pool");

async function allocateBooks(req, res) {
  try {
    const allocateDetails = req.body;
    const promises = allocateDetails.map(async (allocateDetail) => {
      const sid = allocateDetail.sid;
      const bid = allocateDetail.bid;
      await pool.query(
        "UPDATE ISSUES SET SID=$1 WHERE BID=$2 and return_date is NULL",
        [sid, bid]
      );
    });
    await Promise.all(promises);
    res.status(200).json({ message: "Books allocated successfully" });
  } catch (error) {
    console.error("Error allocating books:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = allocateBooks;
