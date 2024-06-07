const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const message = req.body.message;

  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });

  res.status(200).json({ message: "Message broadcasted successfully" });
});

module.exports = router;
