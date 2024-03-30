const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const { logger } = require("./middleware");
const cors = require("cors");

const { adminRouter, teacherRouter } = require("./routes");

const forgotpassword = require("./routes/forgotpassword/forgot-password");
const resetpassword = require("./routes/forgotpassword/reset-password");
const setnewpassword = require("./routes/forgotpassword/set-newpassword");

const app = express();

const PORT = process.env.PORT || 3000;

// Adding middlewares
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
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

app.post("/forgotpassword", forgotpassword);

app.get("/resetpassword/:id/:token", resetpassword);

app.post("/resetpassword/:id/:token", setnewpassword);

// Start listening to requests
app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
