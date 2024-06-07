const jwt = require("../utils/jwt");
const Chatroom = require("../models/chatroom");
const User = require("../models/user");

const createChatroom = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verifyToken(token);
  const { roomId, password } = req.body;

  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = decoded.userId;

  try {
    const isPrime = await Chatroom.isPrimeMember(userId);
    // console.log("isprime =", isPrime);
    if (!isPrime) {
      return res
        .status(403)
        .json({ message: "Only prime members can create chatrooms" });
    }

    await Chatroom.createdChatroom(roomId, userId, password);
    res.status(201).json({ message: "Chatroom created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ err: error.message, message: "Error creating chatroom" });
  }
};

const joinRoom = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  // console.log("token=", token);

  try {
    const decoded = jwt.verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = decoded.userId;
    const { roomId, password } = req.body;

    const user = await User.findUserById(userId);
    const room = await Chatroom.findChatroomById(roomId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!room) {
      return res.status(404).json({ message: "Chatroom not found" });
    }

    if (room.password !== password) {
      return res.status(403).json({ message: "Incorrect room password" });
    }

    if (user.isPrime) {
      await User.joinRoom(userId, roomId);
      return res.status(200).json({ message: "Prime member joined the room" });
    } else {
      const roomCount = await User.countUserRooms(userId);

      if (roomCount === 0) {
        await User.joinRoom(userId, roomId);
        return res
          .status(200)
          .json({ message: "Non-prime member joined the room for free" });
      } else {
        if (user.availCoins >= 150) {
          await User.deductCoins(userId, 150);
          await User.joinRoom(userId, roomId);
          return res.status(200).json({
            message: "Non-prime member joined the room after deducting coins",
          });
        } else {
          return res
            .status(403)
            .json({ message: "Insufficient coins, cannot join the room" });
        }
      }
    }
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res
        .status(409)
        .json({ message: "User is already joined in the room" });
    } else {
      // Handle other errors
      return res.status(500).json({ message: "Error joining room" });
    }
  }
};
module.exports = { createChatroom, joinRoom };
