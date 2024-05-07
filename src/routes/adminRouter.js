const express = require("express");
const app = express.Router();

const {
  addBook,
  addTeacher,
  loginHandler,
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
  deleteStudent,
  getStats,
  getLogYears,
  getAvailableBooks,
  issueBooksStudent,
} = require("../controllers/admin");

const { adminauth } = require("../middleware");
const updateBook = require("../controllers/admin/editBook");

// LOGIN ROUTE
app.post("/login", loginHandler);

// TEACHER ROUTES
app.get("/teachers", getTeachers);
app.post("/teachers", addTeacher);
app.patch("/teachers/:id", editTeacher);
app.delete("/teachers/:id", deleteTeacher);

//Student Routes
app.get("/students", getStudents);
app.post("/students", addStudent);
app.patch("/students/:id", editStudent);
app.delete("/students/:id", deleteStudent);

// BOOK ROUTES
// ISSUE or RETURN ROUTES
app.post("/books/issuetostudent", issueBooksStudent);

app.post("/books/issue/", issueBooks);
app.post("/books/return/", returnBooks);

app.post("/books/category", addCategory);
app.get("/books/categories", getCategories);
app.get("/books/search/:term", searchBook);

app.get("/issuedbooks", getIssuedBooks);

app.get("/books/:id", getBookByID);
app.get("/books", getBooks);
app.get("/availablebooks", getAvailableBooks);

app.post("/existingbook", addExistingBook);
app.post("/books", addBook);
app.patch("/books/:id", updateBook);
app.delete("/books/:id", deleteBook);

// Get all issued books

app.get("/log/:year", getLog);
app.get("/logyears", getLogYears);

app.get("/stats", getStats);

module.exports = app;
