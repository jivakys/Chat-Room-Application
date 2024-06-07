const db = require("../utils/db");

const Chatroom = {
  createdChatroom: (roomId, creatorId, password) => {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO chatrooms (roomId, creatorId, password) VALUES (?, ?, ?)",
        [roomId, creatorId, password],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
  },

  isPrimeMember: (userId) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT isPrime FROM users WHERE userId = ?",
        [userId],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results[0] && results[0].isPrime === 1);
          }
        }
      );
    });
  },

  findChatroomById: (roomId) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM chatrooms WHERE roomId = ?",
        [roomId],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results[0]);
          }
        }
      );
    });
  },

  checkFreeRoomJoin: (userId) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT COUNT(*) as totalRooms FROM chatrooms WHERE creatorId = ?",
        [userId],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            const totalRoomsJoined = results[0].totalRooms;
            const isFreeRoomAvailable = totalRoomsJoined < 1;
            resolve(isFreeRoomAvailable);
          }
        }
      );
    });
  },
  countUserRooms: (userId) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT COUNT(*) as count FROM user_rooms WHERE userId = ?",
        [userId],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results[0].count);
          }
        }
      );
    });
  },
};

module.exports = Chatroom;
