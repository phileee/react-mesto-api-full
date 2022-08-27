const routers = require('express').Router();
const routerUser = require('./users');
const routerCard = require('./cards');

routers.use(routerUser);
routers.use(routerCard);

module.exports = routers;
