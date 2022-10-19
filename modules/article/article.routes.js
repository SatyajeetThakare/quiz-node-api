const routes = require('express').Router();
const {
  create,
  getArticles,
  getById,
  update,
  _delete
} = require('./article.controller');
const { isAuthenticated } = require('../../middlewares/isAuthenticated');

routes.get('/articles/getArticles', isAuthenticated, getArticles);
routes.get('/articles/getById/:id', isAuthenticated, getById);
routes.post('/articles/create', isAuthenticated, create);
routes.delete('/articles/deleteArticle/:id', isAuthenticated, _delete);
routes.patch('/articles/update', isAuthenticated, update);

module.exports = routes;