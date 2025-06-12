# Todo Application - PERN Stack

A full-stack todo application built using PostgreSQL, Express, React, and Node.js (PERN stack).

## Features


- Create, Read, Update, and Delete Todos
- Mark todos as complete/incomplete
- Task description support
- Real-time updates
- Responsive design
- Sort tasks by completion status and time
- Toast notifications for user feedback

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn package manager

## Project Structure
PERN_STACK/
├── backend/
│ ├── config/
│ │ └── db.js
│ ├── controllers/
│ │ └── todoController.js
│ ├── middleware/
│ │ └── authMiddleware.js
│ ├── routes/
│ │ └── todoRoutes.js
│ └── server.js
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── redux/
│ │ ├── lib/
│ │ └── App.jsx
│ └── package.json
└── package.json

## Database Setup

1. Create a PostgreSQL database:
```sql
CREATE DATABASE todo_db;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE todos (
    todo_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


//DB
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=todo_db
JWT_SECRET=your_jwt_secret
PORT=5000


//FRONTEND .ENV
VITE_API_URL=http://localhost:5000

The application will be available at:

Frontend: http://localhost:5173

Backend: http://localhost:5000

API Endpoints
** You can integrate user authentication if you want to scale this application**
Todo Routes
GET /api/todo - Get all todos

POST /api/todo - Create a new todo

PUT /api/todo/:id - Update a todo

DELETE /api/todo/:id - Delete a todo

Technologies Used
Backend
Node.js

Express.js

PostgreSQL

JWT for authentication

bcrypt for password hashing

cors for handling CORS

dotenv for environment variables

Frontend
React

Redux Toolkit for state management

Axios for API requests

React Router for routing

React Icons

React Toastify for notifications

Bootstrap for styling

Deployment
Backend Deployment:

Update database connection string

Set environment variables

Deploy to your preferred hosting service

Frontend Deployment:

Build the frontend:

cd frontend
npm run build


Thank you for exploring my PERN Stack Todo Application! I hope this project helps you understand the integration of PostgreSQL, Express, React, and Node.js better. If you found this helpful, please consider giving it a star ⭐

### Connect With Me
- GitHub: [hussainbinfazal](https://github.com/hussainbinfazal)
- Twitter: https://x.com/Hussainbinfaza1?t=japwjxMR7bJIjG3f8AMW-g&s=09

Made with ❤️ by Hussain Bin Fazal

---
"The only way to do great work is to love what you do." - Steve Jobs