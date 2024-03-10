const express = require("express");
const pool = require("../database/pool");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express.Router();
const { teacherauth } = require("../middleware");

//////////////////////////////////////////////////////////////////
////
////        REQUEST ROUTES
////
//////////////////////////////////////////////////////////////////

app.post("/login", loginHandler);
app.get("/books", teacherauth, () => {});
app.post("/allocate", teacherauth, allocateBooks);
app.get("/students", teacherauth, getStudents);

//////////////////////////////////////////////////////////////////
////
////        REQUEST HANDLERS
////
//////////////////////////////////////////////////////////////////

//Teacher Login Handler
async function loginHandler(req, res) {
  const id = req.body.id;
  const password = req.body.password;
  try {
    const result = await pool.query("select * from teachers where id = $1", [
      id,
    ]);

    if (result.rowCount == 0) {
      res.status(404).json({ status: false, msg: "user doesn't exist" });
      return;
    }
    const hashedPassword = result.rows[0].password;
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    if (passwordMatch) {
      const cls = result.rows[0].class;
      //Sending back authtoken
      const key = jwt.sign({ type: "Teacher", id: id, class: cls }, "hello");
      res.set("x-authtoken", key);
      res.status(200).json({ status: true, msg: "user authenticated" });

      return;
    } else {
      res.status(404).json({ status: false, msg: "password invalid" });
      return;
    }
  } catch (error) {
    res.status(400).json({ status: false, msg: "error" });
  }
}

async function getStudents(req, res) {
  try {
    const cls = req.user.class;
    console.log(cls);
    const result = await pool.query("select * from students where class = $1", [
      cls,
    ]);
    console.log(result);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(404).json({ status: false, msg: "s" });
  }
}

async function allocateBooks(req, res) {}

module.exports = app;
