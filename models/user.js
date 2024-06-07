const db = require("../utils/db");

const User = {
  createUser: (userId, deviceId, name, phone, availCoins, hash, isPrime) => {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO users (userId, deviceId, name, phone, availCoins, password, isPrime) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [userId, deviceId, name, phone, availCoins, hash, isPrime],
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

  findUserById: (userId) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM users WHERE userId = ?",
        [userId],
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

  joinRoom: (userId, roomId) => {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO user_rooms (userId, roomId) VALUES (?, ?)",
        [userId, roomId],
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

  deductCoins: (userId, coins) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE users SET availCoins = availCoins - ? WHERE userId = ?",
        [coins, userId],
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

module.exports = User;
