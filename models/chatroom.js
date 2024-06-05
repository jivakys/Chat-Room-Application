const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "mysql",
});

const Chatroom = sequelize.define("Chatroom", {
  _id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  roomName: {
    type: DataTypes.STRING,
  },
  roomPassword: {
    type: DataTypes.STRING,
  },
  creator: {
    type: DataTypes.STRING,
  },
  participants: {
    type: DataTypes.TEXT,
  },
});

module.exports = Chatroom;
