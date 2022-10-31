const routes = require('express').Router();
const {
  create,
  getCommunications,
  getById,
  update,
  _delete,
  getUnseenCommunications,
  markCommunicationsAsSeen,
  sendContactUsEmail
} = require('./communication.controller');
const { isAuthenticated } = require('../../middlewares/isAuthenticated');

routes.get('/communications/getCommunications/:topicId/:mentorId/:senderId', isAuthenticated, getCommunications);
routes.get('/communications/getById/:id', isAuthenticated, getById);
routes.get('/communications/getUnseenCommunications/:mentorId', isAuthenticated, getUnseenCommunications);
routes.post('/communications/create', isAuthenticated, create);
routes.delete('/communications/deleteCommunication/:id', isAuthenticated, _delete);
routes.patch('/communications/update', isAuthenticated, update);
routes.put('/communications/markCommunicationsAsSeen', isAuthenticated, markCommunicationsAsSeen);
routes.post('/communications/sendContactUsEmail', isAuthenticated, sendContactUsEmail);

module.exports = routes;