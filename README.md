# Chat-Room-Application

This is a Node.js chat app that allows users to register, login, create chat rooms, invite friends, and send messages.

Setup:

1. Clone the repository: `git clone https://github.com/jivakys/Chat-Room-Application`
2. Install dependencies: `npm install`
3. Create a MySQL database and update the `chatroom_schema.sql` file with your database credentials.
4. Run the application: `node index.js`

API Endpoints:

- `/api/auth/register`: Register a new user
- `/api/auth/login`: Login an existing user
- `/api/chatrooms`: Create a new chat room
- `/api/joinroom`: Join an existing chat room
- `/api/messages`: Send a message in a chat room
- `/api/profile/:userId`: View a user's profile
- `/api/friend-requests`: Send a friend request
