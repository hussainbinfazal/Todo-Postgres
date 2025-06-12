// server.js

const express = require('express');
const cors = require('cors');
// const { Pool } = require('pg');
const pool   = require('./Database/db');
const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();
const path = require('path');

// Initialize Express app
const app = express();
// FRIST CORS POLCIY
app.use(cors({
  origin: "http://localhost:5173",
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // You can customize the methods allowed
  allowedHeaders: ['Content-Type', 'Authorization','X-Requested-With'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  credentials: true,
  optionsSuccessStatus: 200
})); // Allow cross-origin requests (important for frontend-backend communication)
//MIDDLEWARES FOR THE SERVER
app.use(express.json()); // Parse incoming JSON requests
app.use(cookieParser());
// API ROUTES
app.use('/api', userRoutes)
app.use('/api/todo',todoRoutes);


// Deployement Path
const __dirname1 = path.resolve();
app.use(express.static(path.join(__dirname1, 'frontend/dist')));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname1, "frontend", "dist", "index.html"));
});
// Middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});



// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});