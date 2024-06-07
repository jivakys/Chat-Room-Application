const socketIo = require("socket.io");

let io;

const init = (server) => {
  io = socketIo(server);

  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("joinRoom", ({ roomId }) => {
      socket.join(roomId);
    });

    socket.on("sendMessage", ({ roomId, message }) => {
      io.to(roomId).emit("receiveMessage", message);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};

module.exports = {
  init,
};
