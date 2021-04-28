const express = require('express');
const {
  registerUserContrl,
  loginUserCtrl,
} = require('../../controllers/users/usersCtrl');

const usersRoutes = express.Router();

usersRoutes.post('/register', registerUserContrl);
usersRoutes.post('/login', loginUserCtrl);

module.exports = { usersRoutes };
