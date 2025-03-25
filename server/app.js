const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const { errorHandler } = require('./middlewares/errorMiddleware');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

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
