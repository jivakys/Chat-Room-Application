const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const User = sequelize.define(
  "User",
  {
    userId: {
      type: DataTypes.STRING(255),
      primaryKey: true,
    },
    deviceId: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    availCoins: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    isPrime: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
module.exports = User;
