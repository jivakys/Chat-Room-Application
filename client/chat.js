document.addEventListener("DOMContentLoaded", () => {
  const socketUrl = "ws://localhost:5000";
  let socket;

  const connectWebSocket = () => {
    socket = new WebSocket(socketUrl);

    socket.onopen = () => {
      console.log("Connected to WebSocket server");

      const roomId = localStorage.getItem("roomId");
      const userId = localStorage.getItem("userId");
      const userName = localStorage.getItem("name");
      if (roomId && userId) {
        socket.send(JSON.stringify({ type: "join", roomId, userId }));
      }
    };

    socket.onmessage = async (event) => {
      let data;
      try {
        data = JSON.parse(event.data);
      } catch (error) {
        console.error("Error parsing incoming message:", error);
        return;
      }

      const chatWindow = document.getElementById("chatWindow");

      const messageElement = document.createElement("div");
      const senderName =
        data.userId === localStorage.getItem("userId")
          ? localStorage.getItem("name")
          : data.userName;
      messageElement.textContent = `${senderName}: ${data.content}`;
      chatWindow.appendChild(messageElement);
    };

    socket.onclose = () => {
      console.log("Disconnected from WebSocket server");
      setTimeout(connectWebSocket, 1000);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      socket.close();
    };
  };

  connectWebSocket();

  document
    .getElementById("messageForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const messageInput = document.getElementById("messageInput");
      const roomId = localStorage.getItem("roomId");
      const userId = localStorage.getItem("userId");
      const messageId = new Date().getTime().toString();

      const message = {
        type: "message",
        messageId,
        roomId,
        userId,
        content: messageInput.value,
      };

      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));

        try {
          await fetch("http://localhost:5000/api/messages", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              messageId,
              roomId,
              userId,
              content: messageInput.value,
            }),
          });
          console.log("Message sent and stored in database");
        } catch (error) {
          console.error("Error sending message:", error);
        }

        messageInput.value = "";
      } else {
        console.warn(
          "WebSocket is not open. Ready state is:",
          socket.readyState
        );
      }
    });

  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    window.location.href = "index.html";
  });
});
