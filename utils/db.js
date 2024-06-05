const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Jivakys345#",
  database: "chat_room_app",
});

module.exports = connection;
