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


