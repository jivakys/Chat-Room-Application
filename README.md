# Chat-Room-Application

A robust chat room system using JavaScript, Node.js, MySQL, and Express. The application ensures security, user authentication, and interactive communication.

## Setup:

1. Clone the repository: `git clone https://github.com/jivakys/Chat-Room-Application`
2. Install dependencies: `npm install`
3. Create a MySQL database and update the `chatroom_schema.sql` file with your database credentials.
4. Create a `.env` file and configure the database connection and JWT secret.
5. Run the application: `node index.js`

## API Endpoints
### Authentication
- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login a user

### Chat Rooms
- `POST /api/chatrooms`: Create a chat room (prime members only)

### Messages
- `POST /api/messages`: Send a message in a chat room

### Profiles
- `GET /api/profile/:userId`: View user profile

### Friend Requests
- `POST /api/friend-requests`: Send a friend request


## Features

- Real-time communication using WebSockets.
- User authentication and authorization.
- Room-based chat functionality.
- Storing chat messages in a database.

## Tech Stack

- **Frontend:**
  - HTML
  - CSS
  - JavaScript

- **Backend:**
  - Node.js
  - Express.js
  - WebSocket

- **Database:**
  - MySQL

- **Other Tools:**
  - dotenv (for environment variables)
  - cors (for Cross-Origin Resource Sharing)

## Packages

- **express**: Fast, unopinionated, minimalist web framework for Node.js.
- **http**: Node.js built-in module for HTTP server and client functionality.
- **ws**: Simple to use, blazing fast and thoroughly tested WebSocket client and server for Node.js.
- **body-parser**: Node.js body parsing middleware.
- **dotenv**: Module to load environment variables from a `.env` file.
- **path**: Node.js built-in module to handle and transform file paths.
- **cors**: Node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
- **mysql**: Node.js driver for MySQL.


## Security Measures

- Passwords are stored securely using bcrypt.
- JWT is used for authentication.
- Authorization middleware ensures only authenticated users can access protected routes.

## Environment Variables
- `DB_HOST`: Database host
- `DB_USER`: Database user
- `DB_PASS`: Database password
- `DB_NAME`: Database name
- `JWT_SECRET`: Secret key for JWT


