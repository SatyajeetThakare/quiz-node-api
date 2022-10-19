const routes = require('express').Router();
const {
  create,
  getQuestions,
  getQuestionAnswersById,
  update,
  answerAQuestion,
  viewAnsweredQuestions,
  _delete
} = require('./question-and-answer.controller');
const { isAuthenticated } = require('../../middlewares/isAuthenticated');

routes.get('/question-and-answers/getQuestions', isAuthenticated, getQuestions);
routes.get('/question-and-answers/getQuestionAnswersById/:id', isAuthenticated, getQuestionAnswersById);
routes.post('/question-and-answers/create', isAuthenticated, create);
routes.delete('/question-and-answers/deleteQuestion/:id', isAuthenticated, _delete);
routes.put('/question-and-answers/update', isAuthenticated, update);
routes.put('/question-and-answers/answerAQuestion', isAuthenticated, answerAQuestion);
routes.put('/question-and-answers/viewAnsweredQuestions', isAuthenticated, viewAnsweredQuestions);

module.exports = routes;