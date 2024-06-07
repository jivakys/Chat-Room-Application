const db = require("../utils/db");

const FriendRequest = {
  createFriendRequest: (requestId, senderId, receiverId) => {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO friendRequests (requestId, senderId, receiverId) VALUES (?, ?, ?)",
        [requestId, senderId, receiverId],
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
  // Additional methods as needed
};

module.exports = FriendRequest;
