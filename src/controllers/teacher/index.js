const getStudents = require("./getStudents");
const loginHandler = require("./loginHandler");
const allocateBooks = require("./allocateBooks");
const deallocateBook = require("./deallocateBook");
const getTeacherBooks = require("./getTeacherBooks");

module.exports = {
  getStudents,
  loginHandler,
  allocateBooks,
  deallocateBook,
  getTeacherBooks,
};
