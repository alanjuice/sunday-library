const addBook = require("./addBook");
const addTeacher = require("./addTeacher");
const getBookByID = require("./getBookByID");
const getBooks = require("./getBooks");
const getIssuedBooks = require("./getIssuedBooks");
const loginHandler = require("./loginHandler");
const searchBook = require("./searchBook");
const issueBooks = require("./issueBooks");
const returnBooks = require("./returnBook");

module.exports = {
  addBook,
  addTeacher,
  getBookByID,
  getBooks,
  getIssuedBooks,
  loginHandler,
  searchBook,
  issueBooks,
  returnBooks,
};
