const routes = require('express').Router();
const {
  create,
  getTasks,
  getById,
  update,
  _delete
} = require('./task.controller');
const { isAuthenticated } = require('../../middlewares/isAuthenticated');

routes.get('/tasks/getTasks', isAuthenticated, getTasks);
routes.get('/tasks/getById/:id', isAuthenticated, getById);
routes.post('/tasks/create', isAuthenticated, create);
routes.delete('/tasks/deleteTask/:id', isAuthenticated, _delete);
routes.put('/tasks/update', isAuthenticated, update);
// routes.patch('/tasks/update', isAuthenticated, update);

module.exports = routes;