const express = require("express");
const chatroomController = require("../controllers/chatroomController");
// const jwt = require("../utils/jwt");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.post("/chatrooms", authenticate, chatroomController.createChatroom);

// router.post("/join", (req, res) => {
//   const { userId } = req.user;
//   const { roomId, roomPassword } = req.body;

//   db.query(
//     "SELECT * FROM chatrooms WHERE roomId = ? AND roomPassword = ?",
//     [roomId, roomPassword],
//     (error, results) => {
//       if (error) return res.status(500).json({ error });
//       if (!results.length)
//         return res.status(404).json({ message: "Room not found" });
//       if (results[0].participants >= 6)
//         return res.status(403).json({ message: "Room is full" });

//       db.query(
//         "SELECT isPrime, availCoins FROM users WHERE userId = ?",
//         [userId],
//         (error, results) => {
//           if (error) return res.status(500).json({ error });
//           const { isPrime, availCoins } = results[0];
//           if (!isPrime && availCoins < 150)
//             return res
//               .status(403)
//               .json({ message: "Insufficient coins to join room" });

//           db.query(
//             "UPDATE chatrooms SET participants = participants + 1 WHERE roomId = ?",
//             [roomId],
//             (error, results) => {
//               if (error) return res.status(500).json({ error });
//               res.json({ message: "Joined room successfully" });
//             }
//           );
//         }
//       );
//     }
//   );
// });

router.post("/joinroom", chatroomController.joinRoom);

module.exports = router;
