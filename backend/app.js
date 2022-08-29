require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routers = require('./routes/routers');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const middlewareError = require('./middlewares/middleware-errors');
const NotFoundError = require('./errors/not-found-err');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

const app = express();

const corsOrigins = {
  origin: ['http://phile.mesto.nomoredomains.sbs', 'https://phile.mesto.nomoredomains.sbs', 'http://api.phile.mesto.nomoredomains.sbs', 'https://api.phile.mesto.nomoredomains.sbs'],
  credentials: true,
};

app.use(cors(corsOrigins));

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/https?:\/\/(www\.)?[/a-zA-Z\d\-._~:?#[\]@!$&'()*+,;=]+\.([/a-zA-Z\d\-._~:?#[\]@!$&'()*+,;=]+)(\/#)?/),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.use(auth, routers);

app.get('/signout', (req, res, next) => {
  try {
    return res
      .clearCookie('jwt', {
        sameSite: 'None',
        secure: 'True',
        domain: '.phile.mesto.nomoredomains.sbs',
      })
      .header({
        'Access-Control-Allow-Credentials': 'true',
      })
      .send({ message: 'Куки успешно удалены' });
  } catch (err) {
    return next(err);
  }
});

app.use(auth, () => {
  throw new NotFoundError('Страницы не существует');
});

app.use(errorLogger);

app.use(errors());
app.use(middlewareError);

app.listen(PORT);
