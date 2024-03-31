const express = require("express");
const app = express.Router();

const {
  loginHandler,
  getStudents,
  allocateBooks,
  deallocateBook,
  getTeacherBooks,
  getDetails,
  viewAllocation,
  getFreeBooks,
  getAllocatedBooks,
} = require("../controllers/teacher");

const { teacherauth } = require("../middleware");

app.post("/login", loginHandler);
app.get("/books", teacherauth, getTeacherBooks);
app.post("/allocate", teacherauth, allocateBooks);
app.post("/deallocate", teacherauth, deallocateBook);
app.get("/students", teacherauth, getStudents);
app.get("/details", teacherauth, getDetails);
app.get("/viewallocation", teacherauth, viewAllocation);
app.get("/freebooks", teacherauth, getFreeBooks);
app.get("/allocatedbooks", teacherauth, getAllocatedBooks);

module.exports = app;
