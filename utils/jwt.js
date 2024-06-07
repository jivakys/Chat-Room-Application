const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const jwtUtil = {
  generateToken: (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  },
  verifyToken: (token) => {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return null;
    }
  },
};

module.exports = jwtUtil;
