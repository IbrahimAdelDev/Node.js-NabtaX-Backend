const express = require('express');
const cookieParser = require('cookie-parser');
// const indexRouter = require('./routes/index');
const cors = require('cors');
const { FRONTEND_URL } = require('./config/env');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: (origin, callback) => {
    if (origin === FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// app.use("/api/v1", indexRouter);

// app.use(errorHandler);

module.exports = app;