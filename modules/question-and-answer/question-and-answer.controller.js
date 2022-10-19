const express = require('express');
const router = express.Router();
const QuestionAndAnswerService = require('./question-and-answer.service');

const { sendResponse } = require('../../utils');
const { getUserId } = require('../../middlewares/isAuthenticated');

module.exports = router;

async function create(req, res, next) {
    try {
        req.body.createdBy = await getUserId(req);
        QuestionAndAnswerService.create(req.body).then((doc) => {
            res.json({ error: false, success: true, message: "Question created successfully", data: doc });
        }).catch(error => {
            sendResponse(res, 401, null, (error.message || error || error.error), false, true);
        });
    } catch (error) {
        sendResponse(res, 401, null, (error.message || error || error.error), false, true);
    }
}

async function getQuestions(req, res, next) {
    try {
        let _filter = {};
        if (req.query.filters === 'me') {
            _filter.createdBy = await getUserId(req);    
        }
        _filter.isActive = true;

        QuestionAndAnswerService.getQuestions(_filter).then((doc) => {
            res.json({ error: false, success: true, message: "Questions fetched successfully", data: doc })
        }).catch(error => {
            sendResponse(res, 401, null, (error.message || error || error.error), false, true);
        });
    } catch (error) {
        sendResponse(res, 401, null, (error.message || error || error.error), false, true);
    }
}

async function getQuestionAnswersById(req, res, next) {
    try {
        QuestionAndAnswerService.getQuestionAnswersById(req.params.id).then((doc) => {
            res.json({ error: false, success: true, message: "Question and answers fetched successfully", data: doc })
        }).catch(error => {
            sendResponse(res, 401, null, (error.message || error || error.error), false, true);
        });   
    } catch (error) {
        sendResponse(res, 401, null, (error.message || error || error.error), false, true);
    }
}

async function viewAnsweredQuestions(req, res, next) {
    try {
        const userId = await getUserId(req);
        QuestionAndAnswerService.viewAnsweredQuestions(userId).then((doc) => {
            res.json({ error: false, success: true, message: "Question and answers read successfully", data: doc })
        }).catch(error => {
            sendResponse(res, 401, null, (error.message || error || error.error), false, true);
        });   
    } catch (error) {
        sendResponse(res, 401, null, (error.message || error || error.error), false, true);
    }
}

async function update(req, res, next) {
    req.body.updatedBy = await getUserId(req);
    QuestionAndAnswerService.update(req.body)
        .then(() => res.json({ error: false, success: true, message: "Question updated successfully", data: {} }))
        .catch(error => sendResponse(res, 401, null, (error.message || error || error.error), false, true));
}

async function answerAQuestion(req, res, next) {
    req.body.updatedBy = await getUserId(req);
    answer = {
        description: req.body.description,
        answeredBy: await getUserId(req),
        answeredOn: new Date()
    }
    QuestionAndAnswerService.answerAQuestion(req.body.questionId, answer)
        .then((doc) => res.json({ error: false, success: true, message: "Answer added successfully", data: doc }))
        .catch(error => sendResponse(res, 401, null, (error.message || error || error.error), false, true));
}


async function _delete(req, res, next) {
    QuestionAndAnswerService.delete(req.params.id)
        .then(() => res.json({ error: false, success: true, message: "Question deleted successfully", data: {} }))
        .catch(error => sendResponse(res, 401, null, (error.message || error || error.error), false, true));
}

module.exports = {
    create,
    getQuestions,
    getQuestionAnswersById,
    update,
    answerAQuestion,
    viewAnsweredQuestions,
    _delete
};
