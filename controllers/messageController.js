const jwt = require("../utils/jwt");
const Message = require("../models/message");

const sendMessage = async (req, res) => {
  const { roomId, message } = req.body;
  const token = req.headers["x-access-token"];
  const user = jwt.verifyToken(token);
  const chatroom = await Chatroom.findOne({ _id: roomId });
  if (!chatroom) {
    res.status(404).send({ message: "Chat room not found" });
  } else {
    const message = new Message({ roomId, userId: user.userId, message });
    try {
      await message.save();
      res.send({ message: "Message sent successfully" });
    } catch (err) {
      res.status(400).send({ message: "Error sending message" });
    }
  }
};

module.exports = { sendMessage };
