document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const userId = document.getElementById("loginUserId").value;
  const password = document.getElementById("loginPassword").value;

  const loginMessage = document.getElementById("loginMessage");

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, password }),
    });

    const data = await response.json();

    if (response.ok) {
      loginMessage.style.color = "green";
      loginMessage.textContent = "Login successful!";

      localStorage.setItem("userId", data.userId);
      localStorage.setItem("name", data.name);
      localStorage.setItem("token", data.token);

      window.location.href = "user.html";
    } else {
      loginMessage.style.color = "red";
      loginMessage.textContent = data.message || "Invalid credentials";
    }
  } catch (error) {
    loginMessage.style.color = "red";
    loginMessage.textContent = "Error logging in";
  }
});
