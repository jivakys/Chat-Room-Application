document.addEventListener("DOMContentLoaded", () => {
  const chatWindow = document.getElementById("chatWindow");
  const messageForm = document.getElementById("messageForm");
  const messageInput = document.getElementById("messageInput");
  const userList = document.getElementById("userList");

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  if (!token || !userId) {
    alert("You need to be logged in to access the chat room.");
    window.location.href = "index.html";
    return;
  }

  const ws = new WebSocket("ws://localhost:3000");

  ws.onopen = () => {
    console.log("Connected to WebSocket server");
    ws.send(JSON.stringify({ type: "join", token }));
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("Received data:", data);

    if (data.type === "userList") {
      userList.innerHTML = "";
      data.users.forEach((user) => {
        const li = document.createElement("li");
        li.textContent = user.name;
        userList.appendChild(li);
      });
    } else if (data.type === "chatMessage") {
      const messageElement = document.createElement("div");
      messageElement.textContent = `${data.user}: ${data.text}`;
      chatWindow.appendChild(messageElement);
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }
  };

  ws.onclose = () => {
    console.log("Disconnected from WebSocket server");
  };

  messageForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = messageInput.value.trim();
    if (message) {
      ws.send(JSON.stringify({ type: "message", text: message, token }));
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
