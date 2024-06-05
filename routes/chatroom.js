const express = require("express");
const router = express.Router();
const chatroomController = require("../controllers/chatroomController");

router.post("/", chatroomController.createChatroom);
router.post("/join", chatroomController.joinChatroom);

module.exports = router;
