const express = require('express');
const router = express.Router();
const TopicService = require('./topic.service');

const { sendResponse } = require('../../utils');
const { getUserId } = require('../../middlewares/isAuthenticated');

module.exports = router;

async function create(req, res, next) {
    try {
        req.body.createdBy = await getUserId(req);
        TopicService.create(req.body).then((doc) => {
            res.json({ error: false, success: true, message: "Topic created successfully", data: doc });
        }).catch(error => {
            sendResponse(res, 500, null, (error.message || error || error.error), false, true);
        });
    } catch (error) {
        sendResponse(res, 500, null, (error.message || error || error.error), false, true);
    }
}

async function getTopics(req, res, next) {
    try {
        const userId = await getUserId(req);
        let _filter = req.query.filter || {};
        _filter.isActive = true;
        TopicService.getTopics(userId, req.body).then((doc) => {
            res.json({ error: false, success: true, message: "Topics fetched successfully", data: doc })
        }).catch(error => {
            sendResponse(res, 500, null, (error.message || error || error.error), false, true);
        });
    } catch (error) {
        sendResponse(res, 500, null, (error.message || error || error.error), false, true);
    }
}

async function getById(req, res, next) {
    try {
        const userId = await getUserId(req);
        TopicService.getById(req.params.id, userId).then((doc) => {
            res.json({ error: false, success: true, message: "Topic fetched successfully", data: doc })
        }).catch(error => {
            sendResponse(res, 500, null, (error.message || error || error.error), false, true);
        });   
    } catch (error) {
        sendResponse(res, 500, null, (error.message || error || error.error), false, true);
    }
}

async function update(req, res, next) {
    req.body.updatedBy = await getUserId(req);
    TopicService.update(req.body)
        .then(() => res.json({ error: false, success: true, message: "Topic updated successfully", data: {} }))
        .catch(error => sendResponse(res, 500, null, (error.message || error || error.error), false, true));
}

async function _delete(req, res, next) {
    TopicService.delete(req.params.id)
        .then(() => res.json({ error: false, success: true, message: "Topic deleted successfully", data: {} }))
        .catch(error => sendResponse(res, 500, null, (error.message || error || error.error), false, true));
}


module.exports = {
    create,
    getTopics,
    getById,
    update,
    _delete
};
