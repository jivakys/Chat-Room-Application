const express = require("express");
const router = express.Router();
const friendRequestController = require("../controllers/friendRequestController");

router.post("/", friendRequestController.sendFriendRequest);

module.exports = router;
