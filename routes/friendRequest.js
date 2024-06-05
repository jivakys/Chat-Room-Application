const express = require("express");
const router = express.Router();
const friendRequestController = require("../controllers/friendRequestController");

router.post("/send", friendRequestController.sendFriendRequest);
router.get("/:userId", friendRequestController.getFriendRequests);

module.exports = router;
