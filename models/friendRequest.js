const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const FriendRequest = sequelize.define("FriendRequest", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  senderId: {
    type: DataTypes.INTEGER,
  },
  receiverId: {
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.STRING,
  },
});

module.exports = FriendRequest;
