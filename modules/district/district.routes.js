const routes = require('express').Router();
const {
  create,
  getDistricts,
  getById,
  update,
  _delete,
  getByStateId
} = require('./district.controller');
const { isAuthenticated } = require('../../middlewares/isAuthenticated');

routes.get('/districts/getDistricts', isAuthenticated, getDistricts);
routes.get('/districts/getById/:id', isAuthenticated, getById);
routes.get('/districts/getByStateId/:id', isAuthenticated, getByStateId);
routes.post('/districts/create', isAuthenticated, create);
routes.delete('/districts/delete/:id', isAuthenticated, _delete);
routes.patch('/districts/update', isAuthenticated, update);

module.exports = routes;