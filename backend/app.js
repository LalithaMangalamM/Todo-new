// Import necessary modules
const express = require('express');
const { connectToDb } = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Load environment variables
require('dotenv').config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// db connection
connectToDb();

// Routes
const todoRoutes = require('./routes/todoRoutes');
const taskRoutes = require('./routes/tasksRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api', todoRoutes);
app.use('/api', taskRoutes);
app.use('/v1/u', userRoutes);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Set up and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export the app
module.exports = app;
