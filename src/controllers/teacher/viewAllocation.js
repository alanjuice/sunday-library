const pool = require("../../database/pool");

async function viewAllocation(req, res) {
  try {
    const teacherId = req.user.id;
    const results = await pool.query(
      "SELECT s.NAME AS student_name, b.ID AS book_id, b.NAME AS book_name FROM ISSUES i JOIN STUDENTS s ON i.SID = s.ID JOIN BOOKS b ON i.BID = b.ID WHERE i.RETURN_DATE IS NULL AND i.TID = $1;",
      [teacherId]
    );

    const allocations = {}; // Object to store allocations by student

    // Restructure data by grouping books under each student
    results.rows.forEach((row) => {
      const { student_name, book_id, book_name } = row;
      if (!allocations[student_name]) {
        allocations[student_name] = { student_name, books: [] };
      }
      allocations[student_name].books.push({ book_id, book_name });
    });

    // Convert allocations object to array
    const responseData = Object.values(allocations);

    res.status(200).json({ status: true, data: responseData });
  } catch (error) {
    console.error("Error fetching teacher's books:", error);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
}

module.exports = viewAllocation;
