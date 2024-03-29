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
} = require("../controllers/teacher");

const { teacherauth } = require("../middleware");

app.post("/login", loginHandler);
app.get("/books", teacherauth, getTeacherBooks);
app.post("/allocate", teacherauth, allocateBooks);
app.post("/deallocate", teacherauth, deallocateBook);
app.get("/students", teacherauth, getStudents);
app.get("/details", teacherauth, getDetails);
app.get("/viewallocation", teacherauth, viewAllocation);

module.exports = app;
