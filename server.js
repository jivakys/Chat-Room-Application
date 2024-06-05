const express = require("express");
const app = express();
const mysql = require("mysql");
const db = require("./utils/db");
const socket = require("./utils/socket");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoutes = require("./routes/auth");
const chatroomRoutes = require("./routes/chatroom");
const messageRoutes = require("./routes/message");
const profileRoutes = require("./routes/profile");
const friendRequestRoutes = require("./routes/friendRequest");

app.use("/api/auth", authRoutes);
app.use("/api/chatroom", chatroomRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/friend-request", friendRequestRoutes);

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});

// socket.init(server);
