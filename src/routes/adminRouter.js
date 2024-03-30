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
} = require("../controllers/admin");
const { adminauth } = require("../middleware");
const updateBook = require("../controllers/admin/editBook");

// LOGIN ROUTE
app.post("/login", loginHandler);

// BOOK ROUTES
app.post("/books/category", addCategory);
app.get("/books/categories", getCategories);
app.get("/books/search/:term", searchBook);
app.get("/books/:id", getBookByID);
app.get("/books", getBooks);

app.post("/books/:id", addExistingBook);
app.post("/books", addBook);
app.patch("/books/:id", updateBook);
app.delete("/books/", deleteBook);

// TEACHER ROUTES
app.get("/teachers", async () => {});
app.post("/teachers", addTeacher);
app.get("/teachers/:id", async () => {});
app.put("/teachers/:id", async () => {});
app.delete("/teachers/", deleteTeacher);

//Student ROutes
app.post("/students", addStudent);

// ISSUE or RETURN ROUTES
app.post("/books/issue/", issueBooks);
app.post("/books/return/", returnBooks);

// Get all issued books
app.get("/book/issues", getIssuedBooks);

app.get("/log/:year", getLog);

module.exports = app;
