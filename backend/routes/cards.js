const routerCard = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

routerCard.get('/cards', getCards);
routerCard.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/https?:\/\/(www\.)?[/a-zA-Z\d\-._~:?#[\]@!$&'()*+,;=]+\.([/a-zA-Z\d\-._~:?#[\]@!$&'()*+,;=]+)(\/#)?/),
  }),
}), createCard);

routerCard.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24)
      .hex(),
  }),
}), deleteCard);

routerCard.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24)
      .hex(),
  }),
}), likeCard);

routerCard.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24)
      .hex(),
  }),
}), dislikeCard);

module.exports = routerCard;
