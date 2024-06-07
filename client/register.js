document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const userId = document.getElementById("registerUserId").value;
    const deviceId = document.getElementById("registerDeviceId").value;
    const name = document.getElementById("registerName").value;
    const phone = document.getElementById("registerPhone").value;
    const availCoins = document.getElementById("registerAvailCoins").value;
    const password = document.getElementById("registerPassword").value;
    const isPrime = document.getElementById("isPrime").checked;

    const registerMessage = document.getElementById("registerMessage");

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          deviceId,
          name,
          phone,
          availCoins,
          password,
          isPrime,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        registerMessage.style.color = "green";
        registerMessage.textContent = "User registered successfully!";
      } else {
        registerMessage.style.color = "red";
        registerMessage.textContent = data.message || "Error registering user";
      }
    } catch (error) {
      registerMessage.style.color = "red";
      registerMessage.textContent = "Error registering user";
    }
  });
