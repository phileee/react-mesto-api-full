const routerUser = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUserInfo, getUserById, patchUserInfo, patchUserAvatar,
} = require('../controllers/users');

routerUser.get('/users', getUsers);
routerUser.get('/users/me', getUserInfo);

routerUser.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().alphanum().length(24)
      .hex(),
  }),
}), getUserById);

routerUser.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), patchUserInfo);

routerUser.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/https?:\/\/(www\.)?[/a-zA-Z\d\-._~:?#[\]@!$&'()*+,;=]+\.([/a-zA-Z\d\-._~:?#[\]@!$&'()*+,;=]+)(\/#)?/),
  }),
}), patchUserAvatar);

module.exports = routerUser;
