const addBook = require("./addBook");
const addTeacher = require("./addTeacher");
const getBooksByCat = require("./getBooksByCat");
const getBooks = require("./getBooks");
const getIssuedBooks = require("./getIssuedBooks");
const loginHandler = require("./loginHandler");
const searchBook = require("./searchBook");
const issueBooks = require("./issueBooks");
const returnBooks = require("./returnBook");
const getCategories = require("./getCategories");

module.exports = {
  addBook,
  addTeacher,
  getBooksByCat,
  getBooks,
  getIssuedBooks,
  loginHandler,
  searchBook,
  issueBooks,
  returnBooks,
  getCategories,
};
