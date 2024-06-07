document.addEventListener("DOMContentLoaded", (event) => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "index.html";
    return;
  }

  const ws = new WebSocket("ws://localhost:8080");
  const messageForm = document.getElementById("messageForm");
  const messageInput = document.getElementById("messageInput");
  const chatWindow = document.getElementById("chatWindow");
  const userList = document.getElementById("userList");
  const logoutBtn = document.getElementById("logoutBtn");

  ws.onopen = () => {
    console.log("WebSocket connection opened");
    ws.send(JSON.stringify({ type: "join", token }));
  };

  ws.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    console.log("Received message:", message);

    if (message.type === "userList") {
      userList.innerHTML = "";
      message.users.forEach((user) => {
        const li = document.createElement("li");
        li.textContent = user.name;
        userList.appendChild(li);
      });
    } else if (message.type === "chatMessage") {
      const messageDiv = document.createElement("div");
      messageDiv.textContent = `${message.user}: ${message.text}`;
      chatWindow.appendChild(messageDiv);
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }
  };

  ws.onclose = () => {
    console.log("WebSocket connection closed");
  };

  messageForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = messageInput.value.trim();
    if (message) {
      const messageObj = { type: "message", text: message, token };
      console.log("Sending message:", messageObj);
      ws.send(JSON.stringify(messageObj));
      messageInput.value = "";
    }
  });

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    window.location.href = "index.html";
  });
});
