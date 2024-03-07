const jwt = require("jsonwebtoken");

//Used to protect routes that only a admin can access

function adminauth(req, res, next) {
  const token = req.headers["x-authtoken"];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "hello");
    req.user = decoded;
    if (req.user.type == "Admin") {
      console.log("Authenticated");
      next();
    } else {
      console.log("Unauthorized access");
    }
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
}

module.exports = adminauth;
