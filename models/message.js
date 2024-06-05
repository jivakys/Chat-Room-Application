const mysql = require("mysql");

const messageSchema = {
  _id: {
    type: String,
    required: true,
    unique: true,
  },
  roomId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
};

const Message = mysql.model("messages", messageSchema);

module.exports = Message;
