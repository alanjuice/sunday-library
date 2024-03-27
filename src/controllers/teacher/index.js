const getStudents = require("./getStudents");
const loginHandler = require("./loginHandler");
const allocateBooks = require("./allocateBooks");
const deallocateBook = require("./deallocateBook");
const getTeacherBooks = require("./getTeacherBooks");
const getDetails = require("./getDetails");
const viewAllocation = require("./viewAllocation");

module.exports = {
  getStudents,
  loginHandler,
  allocateBooks,
  deallocateBook,
  getTeacherBooks,
  getDetails,
  viewAllocation,
};
