const io = require("socket.io");

const init = (server) => {
  const socket = io(server);

  socket.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("joinRoom", ({ roomId }) => {
      socket.join(roomId);
      console.log(`Client joined room ${roomId}`);
    });

    socket.on("sendMessage", ({ roomId, message }) => {
      socket.to(roomId).emit("newMessage", message);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};

module.exports = { init };
