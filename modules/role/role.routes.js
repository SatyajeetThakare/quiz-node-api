const routes = require('express').Router();
const {
  create,
  getAll,
  getById,
  update
} = require('./role.controller');
const { isAuthenticated } = require('../../middlewares/isAuthenticated');

routes.get('/roles/getAll', isAuthenticated, getAll);
routes.get('/roles/getById/:id', isAuthenticated, getById);
routes.post('/roles/create', isAuthenticated, create);
routes.patch('/roles/update', isAuthenticated, update);

module.exports = routes;