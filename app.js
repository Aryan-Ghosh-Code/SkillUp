const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const connectDB = require('./server/config/database');
const authRoutes = require('./server/routes/authRoutes');
const userRoutes = require('./server/routes/userRoutes');
const courseRoutes = require('./server/routes/courseRoutes');
const { errorHandler } = require('./server/middlewares/errorMiddleware');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));  // ✅ Correct path
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../frontend', 'dist', 'index.html'));
    });
  }

app.get("/", () => {
    res.send("Server up & Running");
}) 

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});
