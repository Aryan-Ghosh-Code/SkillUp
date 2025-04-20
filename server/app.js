const express = require('express');
const mongoose = require("mongoose")
const dotenv = require('dotenv');
const path = require('path');
const cors = require("cors");

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const skillRoutes = require('./routes/skillRoutes');
const courseRoutes = require('./routes/courseRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// Connect to database
const connectDB = require('./config/db');
connectDB();

const app = express();

// Middleware for JSON parsing
app.use(cors());
app.use(express.json());
// Middleware for parsing form-data (if needed)
app.use(express.urlencoded({ extended: false }));

// Use the routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/skillswap', skillRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/payments', paymentRoutes);

app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// Global error handler (optional)
app.use((err, req, res, next) => {
  console.error('Global Error Handler:', err.stack);
  res.status(500).json({ error: 'Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
