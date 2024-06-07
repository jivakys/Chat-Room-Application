const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const db = require("./utils/db");
const authRouter = require("./routes/auth");
const chatroomRouter = require("./routes/chatroom");
const messageRouter = require("./routes/message");
const profileRouter = require("./routes/profile");
const friendRequestRouter = require("./routes/friendRequest");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("New client connected");

  ws.on("message", async (message) => {
    console.log("Received message:", message);
    const data = JSON.parse(message);

    if (data.type === "join") {
      ws.roomId = data.roomId;
      ws.userId = data.userId;
    } else if (data.type === "message") {
      const messageData = JSON.stringify({
        type: "message",
        messageId: data.messageId,
        roomId: data.roomId,
        userId: data.userId,
        content: data.content,
      });

      wss.clients.forEach((client) => {
        if (
          client.readyState === WebSocket.OPEN &&
          client.roomId === ws.roomId
        ) {
          client.send(messageData);
        }
      });

      try {
        await db.query(
          "INSERT INTO messages (messageId, roomId, userId, content) VALUES (?, ?, ?, ?)",
          [data.messageId, data.roomId, data.userId, data.content]
        );
        console.log("Message stored in database");
      } catch (error) {
        console.error("Error storing message in database:", error);
      }
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });

  ws.onerror = (error) => {
    console.error("WebSocket error:", error);
    ws.close();
  };
});

app.use(express.static(path.join(__dirname, "client")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRouter);
app.use("/api", chatroomRouter);
app.use("/api", messageRouter);
app.use("/api", profileRouter);
app.use("/api/friend-requests", friendRequestRouter);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log("WebSocket server is running on ws://localhost:5000");
});
module.exports = { app, wss };
