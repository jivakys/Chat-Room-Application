const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("chat_room_app", "root", "Jivakys345#", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
