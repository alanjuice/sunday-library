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
const addStudent = require("./addStudent");
const addCategory = require("./addCategory");
const getLog = require("./getLog");
const deleteBook = require("./deleteBook");
const deleteTeacher = require("./deleteTeacher");
const addExistingBook = require("./addExistingBook");
const editBook = require("./editBook");
const getBookByID = require("./getBookByID");

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
  addStudent,
  getLog,
  addCategory,
  deleteBook,
  deleteTeacher,
  addExistingBook,
  editBook,
  getBookByID,
};
