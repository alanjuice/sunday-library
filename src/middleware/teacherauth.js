const jwt = require("jsonwebtoken");

//Used to protect routes that only a teacher can access
//Details like "id" can bes accessed via req.user object

function teacherauth(req, res, next) {
  const token = req.headers["x-authtoken"];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "hello");
    req.user = decoded;
    if (req.user.type == "Teacher") {
      console.log("Authenticated");
      next();
    } else {
      console.log("Unauthorized access");
    }
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
}

module.exports = teacherauth;
