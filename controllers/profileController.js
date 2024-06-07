const User = require("../models/user");

const getProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findUserById(userId);
    // console.log("userProfile = ", user);
    if (user) {
      const { password, ...profile } = user;
      res.status(200).json(profile);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error retrieving profile:", error);
    res.status(500).json({ message: "Error retrieving profile" });
  }
};

module.exports = {
  getProfile,
};
