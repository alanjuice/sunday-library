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
} = require("../controllers/admin");
const { adminauth } = require("../middleware");

// LOGIN ROUTE
app.post("/login", loginHandler);

// BOOK ROUTES
app.get("/books/categories", getCategories);
app.get("/books/search/:term", searchBook);
app.get("/books/:category", getBooksByCat);
app.get("/books", getBooks);
app.post("/books", addBook);
app.put("/books/:id", async () => {});
app.delete("/books/:id", async () => {});

// TEACHER ROUTES
app.get("/teachers", async () => {});
app.post("/teachers", addTeacher);
app.get("/teachers/:id", async () => {});
app.put("/teachers/:id", async () => {});
app.delete("/teachers/:id", async () => {});

//Student ROutes
app.post("/students", addStudent);

// ISSUE or RETURN ROUTES
app.post("/books/issue/", issueBooks);
app.post("/books/return/", returnBooks);

// Get all issued books
app.get("/book/issues", getIssuedBooks);

module.exports = app;
