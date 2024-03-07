const express = require("express");
const pool = require("../database/pool");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const app = express.Router();

//////////////////////////////////////////////////////////////////
////
////        REQUEST ROUTES
////
//////////////////////////////////////////////////////////////////

//LOGIN ROUTE
app.post("/login", loginHandler);

//BOOK ROUTES
app.get("/books", getBooks);
app.post("/books", addBook);
app.get("/books/:id", getBook);
app.put("/books/:id", async () => {});
app.delete("/books/:id", async () => {});

//TEACHER ROUTES
app.get("/teacher", async () => {});
app.post("/teacher", addTeacher);
app.get("/teacher/:id", async () => {});
app.put("/teacher/:id", async () => {});
app.delete("/teacher/:id", async () => {});

//ISSUE or RETURN ROUTES
app.post("/books/issue/:bookID", async () => {});
app.post("/books/return/:bookID", async () => {});

//SAMPLE REPORTS -- get all issue books
app.get("/books/issues", async () => {});

//////////////////////////////////////////////////////////////////
////
////        REQUEST HANDLERS
////
//////////////////////////////////////////////////////////////////

//Admin Login Handler
async function loginHandler(req, res) {
  const password = req.body.password;

  try {
    const result = await pool.query(
      "select value from config where key = 'admin_pass'"
    );
    if (result.rows[0].value == password) {
      const token = jwt.sign({
        type: "Admin",
      });
      res.setHeader("x-authtoken", token);
      res.status(200).json({
        status: true,
        msg: "admin authenticated.",
      });
      return;
    } else {
      res.status(404).json({
        status: false,
        msg: "invalid password",
      });
    }
  } catch (error) {
    res.status(400).json({ status: false, msg: "Something went wrong" });
  }
}

//Get All Books Handler
async function getBooks(req, res) {
  try {
    const result = await pool.query("select * from books");
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(404).json({ status: false, msg: "Something went wrong" });
  }
}

//Get ID Book Handler
async function getBook(req, res) {
  try {
    const id = req.params.id;
    const result = await pool.query("select * from books where ID=$1", [id]);
    if (result.rows) {
      res.json({ status: true, data: result.rows });
    } else res.status(404).json({ status: false, msg: "book doesn't exists" });
  } catch (error) {
    res.status(404).json({ status: false, msg: "Something went wrong" });
  }
}

//Add book Handler
async function addBook(req, res) {
  try {
    const id = req.body.id;
    const name = req.body.name;
    const author = req.body.author;
    const price = req.body.price;
    const publisher = req.body.publisher;

    if (!id || !name || !author || !price || !publisher) {
      res.status(400).json({ status: false, msg: "missing fields" });
      return;
    }

    //check if book already exists or not
    const exists = await pool.query("select * from books where id=$1", [id]);
    if (exists.rowCount != 0) {
      res.status(400).json({ status: false, msg: "book already exists" });
      return;
    }

    const result = await pool.query(
      "INSERT INTO BOOKS VALUES($1,$2,$3,$4,$5,$6)",
      [id, name, author, price, publisher, true]
    );
    res.status(200).json({ status: true, msg: "book added" });
  } catch {
    res.json({ status: false, msg: "Something went wrong" });
  }
}

//Add book Handler
async function addTeacher(req, res) {
  try {
    const id = req.body.id;
    const name = req.body.name;
    const mno = req.body.mno;
    const classname = req.body.classname;
    const password = req.body.password;

    if (!id || !name || !mno || !classname || !password) {
      res.status(400).json({ status: false, msg: "missing fields" });
      return;
    }

    //check if teacher already exists or not
    const exists = await pool.query("select * from teachers where id=$1", [id]);
    if (exists.rowCount != 0) {
      res.status(400).json({ status: false, msg: "teacher already exists" });
      return;
    }

    //Encrypting password
    const salt = await bcrypt.genSalt(4);
    const encryptedPassword = await bcrypt.hash(password, salt);
    console.log(encryptedPassword);
    const result = await pool.query(
      "INSERT INTO teachers VALUES($1,$2,$3,$4,$5)",
      [id, name, mno, classname, encryptedPassword]
    );
    res.status(200).json({ status: true, msg: "teacher added" });
  } catch (error) {
    console.log(error);
    res.json({ status: false, msg: "Something went wrong" });
  }
}

module.exports = app;
