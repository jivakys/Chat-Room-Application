const mysql = require("mysql");
const bcrypt = require("../utils/bcrypt");

const userSchema = {
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  deviceId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  availCoins: {
    type: Number,
    default: 0,
  },
  isPrime: {
    type: Boolean,
    default: false,
  },
};

const User = mysql.model("users", userSchema);

module.exports = User;
