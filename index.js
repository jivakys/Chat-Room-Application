const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const http = require("http");
const WebSocket = require("ws");

const db = require("./utils/db");
const authRoutes = require("./routes/auth");
const chatroomRoutes = require("./routes/chatroom");
const profileRoutes = require("./routes/profile");
const friendRequestRoutes = require("./routes/friendRequest");
const jwt = require("jsonwebtoken");
const socket = require("./utils/socket");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, "client")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api", chatroomRoutes);
app.use("/api", profileRoutes);
app.use("/api/friend-requests", friendRequestRoutes);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let users = {};

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    const data = JSON.parse(message);
    console.log("Received data:", data);

    if (data.type === "join") {
      try {
        const decoded = jwt.verify(data.token, process.env.JWT_SECRET);
        ws.userId = decoded.userId;
        ws.userName = "User " + decoded.userId;
        users[ws.userId] = ws;
        broadcastUserList();
      } catch (error) {
        console.error("Invalid token:", error);
        ws.close();
      }
    } else if (data.type === "message") {
      if (ws.userId) {
        const messageData = {
          type: "chatMessage",
          user: ws.userName,
          text: data.text,
        };
        broadcastMessage(messageData);
      } else {
        console.error("Unauthorized message attempt");
        ws.close();
      }
    }
  });

  ws.on("close", () => {
    delete users[ws.userId];
    broadcastUserList();
  });
});

function broadcastUserList() {
  const userList = Object.values(users).map((ws) => ({
    userId: ws.userId,
    name: ws.userName,
  }));
  const message = JSON.stringify({ type: "userList", users: userList });
  Object.values(users).forEach((ws) => ws.send(message));
}

function broadcastMessage(message) {
  const messageStr = JSON.stringify(message);
  Object.values(users).forEach((ws) => ws.send(messageStr));
}

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log("WebSocket server is running on ws://localhost:8080");
});

socket.init(server);
