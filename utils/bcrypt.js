const bcrypt = require("bcrypt");

const hash = async (password, saltRounds) => {
  return await bcrypt.hash(password, saltRounds);
};

const compare = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = { hash, compare };
