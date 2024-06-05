const mysql = require("mysql");

const chatroomSchema = {
  _id: {
    type: String,
    required: true,
    unique: true,
  },
  roomName: {
    type: String,
    required: true,
  },
  roomPassword: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  participants: {
    type: Array,
    default: [],
  },
};

const Chatroom = mysql.model("chatrooms", chatroomSchema);

module.exports = Chatroom;
