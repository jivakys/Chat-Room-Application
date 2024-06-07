const jwt = require("../utils/jwt");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verifyToken(token);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(403).json({ message: "Forbidden" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = authenticate;
