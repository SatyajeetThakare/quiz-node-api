const routes = require('express').Router();
const {
  create,
  getStates,
  getById,
  update,
  _delete
} = require('./state.controller');
const { isAuthenticated } = require('../../middlewares/isAuthenticated');

routes.get('/states/getStates', isAuthenticated, getStates);
routes.get('/states/getById/:id', isAuthenticated, getById);
routes.post('/states/create', isAuthenticated, create);
routes.delete('/states/delete/:id', isAuthenticated, _delete);
routes.patch('/states/update', isAuthenticated, update);

module.exports = routes;