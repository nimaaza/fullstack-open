/* eslint-disable no-undef */

const config = require('./utils/config');

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('express-async-errors');

const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const notesRouter = require('./controllers/notes');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');

const app = express();

logger.info('connecting to', config.MONGODB_URL);

mongoose
  .connect(config.MONGODB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
  .then(() => logger.info('connected to MongoDB'))
  .catch((error) => logger.error('error connecting to MongoDB:', error.message));

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/notes', notesRouter);

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/test');
  app.use('/api/testing', testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
