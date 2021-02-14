const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('express-async-errors');

const config = require('./utils/config');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const blogsRouter = require('./controllers/blogs');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

const app = express();

logger.info('Connecting to MongDB');
mongoose.connect(config.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})
  .then(() => logger.info('Connection to MongoDB established'))
  .catch(error => logger.error(error.message));

app.use(cors());
app.use(express.json());
app.use(middleware.getToken);

app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/blogs', blogsRouter);

app.use(middleware.errorHandler);

module.exports = app;
