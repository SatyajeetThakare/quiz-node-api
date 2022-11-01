const routes = require('express').Router();
const {
  create,
  getTopics,
  getById,
  update,
  _delete
} = require('./topic.controller');
const { isAuthenticated } = require('../../middlewares/isAuthenticated');

routes.get('/topics/getTopics', isAuthenticated, getTopics);
routes.get('/topics/getById/:id', isAuthenticated, getById);
routes.post('/topics/create', isAuthenticated, create);
routes.delete('/topics/deleteTopic/:id', isAuthenticated, _delete);
routes.put('/topics/update', isAuthenticated, update);

module.exports = routes;