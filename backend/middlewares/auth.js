const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-err');

const { SECRET_KEY = 'some-secret-key' } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new AuthError('Необходима авторизация');
  }

  req.user = payload;
  next();
};
