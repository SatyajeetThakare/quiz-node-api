const routes = require('express').Router();
const {
  create,
  getSchools,
  getById,
  update,
  _delete,
  getByDistrictId
} = require('./school.controller');
const { isAuthenticated } = require('../../middlewares/isAuthenticated');

routes.get('/schools/getSchools', isAuthenticated, getSchools);
routes.get('/schools/getById/:id', isAuthenticated, getById);
routes.get('/schools/getByDistrictId/:id', isAuthenticated, getByDistrictId);
routes.post('/schools/create', isAuthenticated, create);
routes.delete('/schools/delete/:id', isAuthenticated, _delete);
routes.patch('/schools/update', isAuthenticated, update);

module.exports = routes;