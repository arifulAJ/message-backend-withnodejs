require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Importing routers
const userRouter = require('./app/routes/userRouter');
const messageRouters=require('./app/routes/messageRouter')


// Database connection setup
const { connectToDatabase } = require('./config/database');

// Initialize Express app
const app = express();

// Connect to database
connectToDatabase();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// CORS setup
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes setup
app.use('/api/v1/users', userRouter);
// chat and message
app.use('/api/v1/message', messageRouters);


// Test route
app.get('/api/v1/test', (req, res) => {
  res.send('I am responding!');
});

// 404 error handling
// app.use(function(req, res, next) {
//   next(createError(404));
// });
 app.use(function(req, res, next) {
    next(res.status(404).json("you request methode is wrong"));
  });


// Error handler
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error'
  });
});

module.exports = app;
