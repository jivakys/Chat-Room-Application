const WebSocket = require("ws");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const wss = new WebSocket.Server({ port: 8080 });

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
