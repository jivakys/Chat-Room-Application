const WebSocket = require("ws");

const wss = new WebSocket("ws://localhost:8080");

wss.on("open", () => {
  console.log("WebSocket connected");
});

wss.on("message", (message) => {
  console.log("Received message from WebSocket:", message);

  // Process the received message as needed
});
