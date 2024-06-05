const mysql = require("mysql");

const friendRequestSchema = {
  _id: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
  },
  friendId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
};

const FriendRequest = mysql.model("friendRequests", friendRequestSchema);

module.exports = FriendRequest;
