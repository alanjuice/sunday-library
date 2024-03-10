const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const { logger } = require("./middleware");
const cors = require("cors");

const { adminRouter, teacherRouter } = require("./routes");

const app = express();

const PORT = process.env.PORT || 3000;

// Adding middlewares
app.use(logger);
app.use(express.json());
app.use(cors());

// Setting routes
app.use("/admin", adminRouter);
app.use("/teacher", teacherRouter);

// Testing server status
app.get("/status", (req, res) => {
  res.json({ alive: true });
});

// Start listening to requests
app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});

// app.listen(3000, "192.168.241.171", () => {});
