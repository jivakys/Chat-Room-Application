const User = require("../models/user");
const bcrypt = require("../utils/bcrypt");
const jwt = require("../utils/jwt");
const validator = require("../utils/validator");

const register = async (req, res) => {
  const { userId, deviceId, name, phone, availCoins, password, isPrime } =
    req.body;

  if (
    !validator.validateUserId(userId) ||
    !validator.validateDeviceId(deviceId) ||
    !validator.validateName(name) ||
    !validator.validatePhone(phone) ||
    !validator.validatePassword(password) ||
    !validator.validateIsPrime(isPrime)
  ) {
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    const hash = await bcrypt.hashPassword(password);
    await User.createUser(
      userId,
      deviceId,
      name,
      phone,
      availCoins,
      hash,
      isPrime
    );
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Error registering user" });
  }
};

const login = async (req, res) => {
  const { userId, password } = req.body;

  try {
    const user = await User.findUserById(userId);
    if (user && (await bcrypt.comparePassword(password, user.password))) {
      const token = jwt.generateToken({ userId: user.userId });
      res.status(200).json({ token, userId: user.userId, name: user.name });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
};
