const jwt = require("jsonwebtoken");

async function resetpassword(req, res) {
  const { token, id } = req.params;
  console.log(token, id);
  try {
    let SECRET;
    if (id === "admin") {
      SECRET = process.env.SECRET_KEY;
    } else {
      SECRET = process.env.SECRET_KEY + id;
    }
    console.log(SECRET);
    const payload = jwt.verify(token, SECRET);
    res.render("resetpassword");
  } catch (error) {
    console.log(error);
    console.log("Error,invalid url");
    res.render("error");
  }
}

module.exports = resetpassword;
