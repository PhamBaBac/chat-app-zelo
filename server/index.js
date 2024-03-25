const express = require('express');
const cors = require('cors');
const authRouter = require('./src/routers/authRouter');
const connectDB = require('./src/configs/connectDB');
const errorMiddleware = require('./src/middlewares/errorMiddleware');
const app = express();

const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);

// Connect to MongoDB
connectDB();

// app.use(errorMiddleware);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}
);


