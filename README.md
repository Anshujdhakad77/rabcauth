Overview


This project implements a secure Authentication, Authorization, and Role-Based Access Control (RBAC) system using Node.js, Express.js, and MongoDB. It enables users to register, log in, and access resources based on their roles 


Authentication


User registration with secure password hashing using bcrypt.
Login with email and password.
JWT-based authentication for stateless session management.
Tokens include role and user information to simplify authorization checks.

Authorization

Middleware to restrict access based on user roles.
Permissions defined per role (e.g., Admin has broader access than User).
Role-Based Access Control (RBAC)
Roles supported: Admin, Moderator, User.
Route-specific role restrictions:
Admin: Full access to all resources.
Moderator: Access to moderation-specific resources.
User: Access limited to user-level features.

Tech Stack

Node.js: Backend runtime.
Express.js: Web framework.
MongoDB: Database for storing users and roles.
Mongoose: ODM for MongoDB.
JWT (JSON Web Tokens): Token-based authentication.
bcrypt: For password hashing.
dotenv: For managing environment variables.
Project Structure
bash

project   



git clone https://github.com/Anshujdhakad77
cd rbac-system
3. Install Dependencies


npm install
4. Configure Environment Variables
Create a .env file in the root directory and add:

env
Copy code
PORT=3000
MONGO_URI=mongodb://localhost:27017/rbac_system
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=10d
5. Start the Server
bash

npm start

The server will run on http://localhost:3000.

API Endpoints
Authentication Routes
Method	Endpoint	Description	Authorization
POST	/api/auth/register	Register a new user	Public
POST	/api/auth/login	Log in and get a JWT token	Public
Request Example: /api/auth/register
json
Copy code     
{
  "email": "admin@example.com",
  "password": "password123",
  "role": "Admin"
}

Protected Routes
Method	Endpoint	Description	Authorization
GET	/api/protected/admin	Admin-only resource	Admin
GET	/api/protected/moderator	Moderator and Admin access	Moderator, Admin
GET	/api/protected/user	Accessible by any authenticated user	Any Authenticated User
Request Example: /api/protected/admin
Include the JWT in the Authorization header:

makefile

Authorization: Bearer <my jwt token>

er Registration
A user registers with an email, password, and role.
Password is hashed using bcrypt before being stored in the database.
2. User Login
User provides their email and password.
If authenticated, a JWT is issued containing the user's ID and role.


3. Role-Based Access Control
Middleware authMiddleware.js checks the JWT for authentication.
Middleware roleMiddleware.js verifies if the user's role is allowed to access the route.
Testing the System
Using Postman
Register:

Send a POST request to /api/auth/register with email, password, and role.
Login:

Send a POST request to /api/auth/login with valid credentials.
Copy the JWT token from the response.
Access Protected Routes:

Include the JWT token in the Authorization header as Bearer" provided token".
Test routes like:
/api/protected/admin
/api/protected/moderator
/api/protected/user