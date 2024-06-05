const FriendRequest = require("../models/friendRequest");

const sendFriendRequest = async (req, res) => {
  const { friendId } = req.body;
  const token = req.headers["x-access-token"];
  const user = jwt.verifyToken(token);
  const friendRequest = new FriendRequest({ userId: user.userId, friendId });
  try {
    await friendRequest.save();
    res.send({ message: "Friend request sent successfully" });
  } catch (err) {
    res.status(400).send({ message: "Error sending friend request" });
  }
};

const getFriendRequests = async (req, res) => {
  const { userId } = req.params;
  const friendRequests = await FriendRequest.find({ friendId: userId });
  res.send(friendRequests);
};

module.exports = { sendFriendRequest, getFriendRequests };
