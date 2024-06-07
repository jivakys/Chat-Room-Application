const db = require("../utils/db");

const Message = {
  createMessage: (messageId, roomId, userId, content) => {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO messages (messageId, roomId, userId, content) VALUES (?, ?, ?, ?)",
        [messageId, roomId, userId, content],
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
};

module.exports = Message;
