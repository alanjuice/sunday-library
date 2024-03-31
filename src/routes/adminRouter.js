const express = require("express");
const app = express.Router();

const {
  addBook,
  addTeacher,
  loginHandler,
  getBooksByCat,
  getBooks,
  getIssuedBooks,
  searchBook,
  issueBooks,
  returnBooks,
  getCategories,
  addStudent,
  deleteBook,
  deleteTeacher,
  addCategory,
  getLog,
  addExistingBook,
  getBookByID,
  editStudent,
  editTeacher,
  getStudents,
  getTeachers,
  deleteStudent
} = require("../controllers/admin");
const { adminauth } = require("../middleware");
const updateBook = require("../controllers/admin/editBook");

// LOGIN ROUTE
app.post("/login", loginHandler);

// TEACHER ROUTES
app.get("/teachers", getTeachers);
app.post("/teachers", addTeacher);
app.patch("/teachers/:id", editTeacher);
app.delete("/teachers/", deleteTeacher);

//Student Routes
app.get("/students", getStudents);
app.post("/students", addStudent);
app.patch("/students", editStudent);
app.delete("/students/", deleteStudent );

// BOOK ROUTES
// ISSUE or RETURN ROUTES
app.post("/books/issue/", issueBooks);
app.post("/books/return/", returnBooks);

app.post("/books/category", addCategory);
app.get("/books/categories", getCategories);
app.get("/books/search/:term", searchBook);
app.get("/books/:id", getBookByID);
app.get("/books", getBooks);

app.post("/books/:id", addExistingBook);
app.post("/books", addBook);
app.patch("/books/:id", updateBook);
app.delete("/books/:id", deleteBook);

// Get all issued books
app.get("/book/issues", getIssuedBooks);

app.get("/log/:year", getLog);

module.exports = app;
