const getStudents = require("./getStudents");
const loginHandler = require("./loginHandler");
const allocateBooks = require("./allocateBooks");
const deallocateBook = require("./deallocateBook");
const getTeacherBooks = require("./getTeacherBooks");
const getDetails = require("./getDetails");
const viewAllocation = require("./viewAllocation");
const getFreeBooks = require("./getFreeBooks");
const getAllocatedBooks = require("./getAllocatedBooks");

module.exports = {
  getStudents,
  loginHandler,
  allocateBooks,
  deallocateBook,
  getTeacherBooks,
  getDetails,
  viewAllocation,
  getFreeBooks,
  getAllocatedBooks,
};
