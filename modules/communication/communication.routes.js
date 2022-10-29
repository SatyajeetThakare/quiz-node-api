const routes = require('express').Router();
const {
  create,
  getCommunications,
  getById,
  update,
  _delete
} = require('./communication.controller');
const { isAuthenticated } = require('../../middlewares/isAuthenticated');

routes.get('/communications/getCommunications/:mentorId', isAuthenticated, getCommunications);
routes.get('/communications/getById/:id', isAuthenticated, getById);
routes.post('/communications/create', isAuthenticated, create);
routes.delete('/communications/deleteCommunication/:id', isAuthenticated, _delete);
routes.patch('/communications/update', isAuthenticated, update);

module.exports = routes;