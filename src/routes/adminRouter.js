const express = require("express");
const app = express.Router();

const {
  addBook,
  addTeacher,
  loginHandler,
  getBookByID,
  getBooks,
  getIssuedBooks,
  searchBook,
  issueBooks,
  returnBooks,
} = require("../controllers/admin");
const { adminauth } = require("../middleware");

//LOGIN ROUTE
app.post("/login", loginHandler);

//BOOK ROUTES
app.get("/books", getBooks);
app.post("/books", addBook);
app.get("/books/:id", getBookByID);
app.put("/books/:id", async () => {});
app.delete("/books/:id", async () => {});
app.get("/books/search/:term", searchBook);

//TEACHER ROUTES
app.get("/teachers", async () => {});
app.post("/teachers", addTeacher);
app.get("/teachers/:id", async () => {});
app.put("/teachers/:id", async () => {});
app.delete("/teachers/:id", async () => {});

//ISSUE or RETURN ROUTES
app.post("/books/issue/", issueBooks);
app.post("/books/return/", returnBooks);

// get all issued books
app.get("/book/issues", getIssuedBooks);

module.exports = app;
