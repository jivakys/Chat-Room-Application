const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const payload = {
    userId: user.userId,
    deviceId: user.deviceId,
    name: user.name,
    phone: user.phone,
    availCoins: user.availCoins,
    isPrime: user.isPrime,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
