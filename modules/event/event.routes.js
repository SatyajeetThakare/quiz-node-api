const routes = require('express').Router();
const {
  create,
  getAll,
  getById,
  update
} = require('./event.controller');
const { isAuthenticated } = require('../../middlewares/isAuthenticated');

routes.get('/events/getAll', isAuthenticated, getAll);
routes.get('/events/getById/:id', isAuthenticated, getById);
routes.post('/events/create', isAuthenticated, create);
routes.patch('/events/update', isAuthenticated, update);

module.exports = routes;