const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (request, response) => {
  const user = await User.findOne({ username: request.body.username });
  const passwordIsCorrect = user === null
    ? false
    : await bcrypt.compare(request.body.password, user.passwordHash);

  if ((user && passwordIsCorrect)) {
    const token = jwt.sign({
      username: user.username,
      id: user._id,
    }, process.env.SECRET);

    response.status(200).send({
      token,
      username: user.username,
      name: user.name,
    });
  } else {
    response.status(401).json({
      error: 'invalid username or password',
    });
  }
});

module.exports = loginRouter;
