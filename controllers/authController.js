const jwt = require("../utils/jwt");
const bcrypt = require("../utils/bcrypt");
const User = require("../models/user");
require("dotenv").config();

const register = async (req, res) => {
  const { userId, deviceId, name, phone, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, process.env.SALT);
  const user = new User({
    userId,
    deviceId,
    name,
    phone,
    password: hashedPassword,
  });
  try {
    await user.save();
    res.status(201).send({ message: "User created successfully" });
  } catch (err) {
    res.status(400).send({ message: "Error creating user" });
  }
};

const login = async (req, res) => {
  const { userId, password } = req.body;
  const user = await User.findOne({ userId });
  if (!user) {
    res.status(401).send({ message: "Invalid credentials" });
  } else {
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      const token = jwt.generateToken(user);
      res.send({ token });
    } else {
      res.status(401).send({ message: "Invalid credentials" });
    }
  }
};

module.exports = { register, login };
