const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');

const indexRouter = require('./routes/index');
const apiLimiter = require('./middlewares/rateLimiter');
const { logger } = require('./config/logger');

const { FRONTEND_URL } = require('./config/env');
const errorHandler = require('./middlewares/errorHandler');


const app = express();


app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(cookieParser());


// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin || origin === FRONTEND_URL) {
//       callback(null, true);
//     } else {
//       logger.warn(`CORS request from disallowed origin: ${origin}`);
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
// }));
app.use(
  cors({
    origin: ["http://localhost:5173", "http://192.168.1.5:5173"], // IP الجهاز اللي عليه الموبايل
    credentials: true,
  })
);

app.use("/api/v1", apiLimiter, indexRouter);

// app.use('/', (req, res) => {
//   res.send('Hello World!');
// });

app.use(errorHandler);

module.exports = app;