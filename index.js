const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const errorMiddleware = require('./middleware/error-middleware');


const PORT = process.env.PORT || 5000;
const authRouter = require('./router/auth-router');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/auth', authRouter);
app.use(errorMiddleware); //має бути останнім

const start = async () => {
  try {
    mongoose.connect(process.env.DB_URL);
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
