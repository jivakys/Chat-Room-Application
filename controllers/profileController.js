const User = require("../models/user");

const getProfile = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findOne({ userId });
  if (!user) {
    res.status(404).send({ message: "User not found" });
  } else {
    res.send(user);
  }
};

module.exports = { getProfile };
