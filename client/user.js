document.addEventListener("DOMContentLoaded", () => {
  const createRoomBtn = document.getElementById("createRoomBtn");
  const joinRoomBtn = document.getElementById("joinRoomBtn");
  const createRoomForm = document.getElementById("createRoomForm");
  const joinRoomForm = document.getElementById("joinRoomForm");
  const createRoom = document.getElementById("createRoom");
  const joinRoom = document.getElementById("joinRoom");
  const createRoomMessage = document.getElementById("createRoomMessage");
  const joinRoomMessage = document.getElementById("joinRoomMessage");
  const logoutBtn = document.getElementById("logoutBtn");

  createRoomBtn.addEventListener("click", () => {
    createRoomForm.classList.toggle("hidden");
    joinRoomForm.classList.add("hidden");
  });

  joinRoomBtn.addEventListener("click", () => {
    joinRoomForm.classList.toggle("hidden");
    createRoomForm.classList.add("hidden");
  });

  createRoom.addEventListener("submit", async (e) => {
    e.preventDefault();

    const roomId = document.getElementById("createRoomId").value;
    const password = document.getElementById("createRoomPassword").value;
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/api/chatrooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ roomId, password }),
      });

      const data = await response.json();

      if (response.ok) {
        createRoomMessage.style.color = "green";
        createRoomMessage.textContent = "Chatroom created successfully";
      } else {
        createRoomMessage.style.color = "red";
        createRoomMessage.textContent =
          data.message || "Error creating chatroom";
      }
    } catch (error) {
      createRoomMessage.style.color = "red";
      createRoomMessage.textContent = "Error creating chatroom";
    }
  });

  joinRoom.addEventListener("submit", async (e) => {
    e.preventDefault();

    const roomId = document.getElementById("joinRoomId").value;
    const password = document.getElementById("joinRoomPassword").value;
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/api/joinroom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ roomId, password }),
      });

      const data = await response.json();

      if (response.ok) {
        joinRoomMessage.style.color = "green";
        joinRoomMessage.textContent = "Joined the room successfully";
        window.location.href = "chat.html";
      } else {
        joinRoomMessage.style.color = "red";
        joinRoomMessage.textContent = data.message || "Error joining room";
      }
    } catch (error) {
      joinRoomMessage.style.color = "red";
      joinRoomMessage.textContent = "Error joining room";
    }
  });

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    window.location.href = "index.html";
  });
});
