const jwt = require("../utils/jwt");
const Chatroom = require("../models/chatroom");

const createChatroom = async (req, res) => {
  const { roomName, roomPassword } = req.body;
  const token = req.headers["x-access-token"];
  const user = jwt.verifyToken(token);
  if (!user.isPrime) {
    res
      .status(403)
      .send({ message: "Only prime members can create chat rooms" });
  } else {
    const chatroom = new Chatroom({
      roomName,
      roomPassword,
      creator: user.userId,
    });
    try {
      await chatroom.save();
      res.status(201).send({ message: "Chat room created successfully" });
    } catch (err) {
      res.status(400).send({ message: "Error creating chat room" });
    }
  }
};

const joinChatroom = async (req, res) => {
  const { roomId, roomPassword } = req.body;
  const token = req.headers["x-access-token"];
  const user = jwt.verifyToken(token);
  const chatroom = await Chatroom.findOne({ _id: roomId });
  if (!chatroom) {
    res.status(404).send({ message: "Chat room not found" });
  } else if (chatroom.participants.length >= 6) {
    res.status(403).send({ message: "Chat room is full" });
  } else {
    if (user.isPrime) {
      await chatroom.participants.push(user.userId);
      await chatroom.save();
      res.send({ message: "Joined chat room successfully" });
    } else {
      if (user.joinedRooms.length === 0) {
        await chatroom.participants.push(user.userId);
        await chatroom.save();
        res.send({ message: "Joined chat room successfully" });
      } else if (user.availCoins >= 150) {
        await chatroom.participants.push(user.userId);
        await chatroom.save();
        user.availCoins -= 150;
        await user.save();
        res.send({ message: "Joined chat room successfully" });
      } else {
        res.status(402).send({ message: "Insufficient coins" });
      }
    }
  }
};

module.exports = { createChatroom, joinChatroom };
