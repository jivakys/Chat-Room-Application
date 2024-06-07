CREATE TABLE users (
    userId VARCHAR(255) PRIMARY KEY,
    deviceId VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    availCoins INT DEFAULT 0,
    password VARCHAR(255) NOT NULL,
    isPrime BOOLEAN DEFAULT FALSE
);

CREATE TABLE chatrooms (
    roomId VARCHAR(255) PRIMARY KEY,
    creatorId VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    FOREIGN KEY (creatorId) REFERENCES users(userId)
);

CREATE TABLE messages (
    messageId VARCHAR(255) PRIMARY KEY,
    roomId VARCHAR(255) NOT NULL,
    userId VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    FOREIGN KEY (roomId) REFERENCES chatrooms(roomId),
    FOREIGN KEY (userId) REFERENCES users(userId)
);

CREATE TABLE friendRequests (
    requestId VARCHAR(255) PRIMARY KEY,
    senderId VARCHAR(255) NOT NULL,
    receiverId VARCHAR(255) NOT NULL,
    FOREIGN KEY (senderId) REFERENCES users(userId),
    FOREIGN KEY (receiverId) REFERENCES users(userId)
);

CREATE TABLE user_rooms (
    userId VARCHAR(255),
    roomId VARCHAR(255),
    PRIMARY KEY (userId, roomId),
    FOREIGN KEY (userId) REFERENCES users(userId),
    FOREIGN KEY (roomId) REFERENCES chatrooms(roomId)
);
