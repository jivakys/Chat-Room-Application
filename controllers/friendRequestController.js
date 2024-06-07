const FriendRequest = require("../models/friendRequest");
const User = require("../models/user");

const sendFriendRequest = async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    const sender = await User.findUserById(senderId);
    const receiver = await User.findUserById(receiverId);

    if (!sender || !receiver) {
      return res.status(404).json({ message: "User not found" });
    }

    await FriendRequest.createFriendRequest(senderId, receiverId);
    res.status(201).json({ message: "Friend request sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error sending friend request" });
  }
};

module.exports = {
  sendFriendRequest,
};
