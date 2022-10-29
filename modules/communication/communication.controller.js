const express = require('express');
const router = express.Router();
const CommunicationService = require('./communication.service');

const { sendResponse } = require('../../utils');
const { getUserId } = require('../../middlewares/isAuthenticated');

module.exports = router;

async function create(req, res, next) {
    try {
        req.body.createdBy = await getUserId(req);
        CommunicationService.create(req.body).then((doc) => {
            res.json({ error: false, success: true, message: "Communication created successfully", data: doc });
        }).catch(error => {
            sendResponse(res, 500, null, (error.message || error || error.error), false, true);
        });
    } catch (error) {
        sendResponse(res, 500, null, (error.message || error || error.error), false, true);
    }
}

async function getCommunications(req, res, next) {
    try {
        const userId = await getUserId(req);
        const mentorId = req.params.mentorId;
        let _filter = req.query.filter || {};
        _filter.isActive = true;
        CommunicationService.getCommunications(userId, mentorId, _filter).then((doc) => {
            res.json({ error: false, success: true, message: "Communications fetched successfully", data: doc })
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
        CommunicationService.getById(req.params.id, userId).then((doc) => {
            res.json({ error: false, success: true, message: "Communication fetched successfully", data: doc })
        }).catch(error => {
            sendResponse(res, 500, null, (error.message || error || error.error), false, true);
        });   
    } catch (error) {
        sendResponse(res, 500, null, (error.message || error || error.error), false, true);
    }
}

async function update(req, res, next) {
    req.body.updatedBy = await getUserId(req);
    CommunicationService.update(req.body)
        .then(() => res.json({ error: false, success: true, message: "Communication updated successfully", data: {} }))
        .catch(error => sendResponse(res, 500, null, (error.message || error || error.error), false, true));
}

async function _delete(req, res, next) {
    CommunicationService.delete(req.params.id)
        .then(() => res.json({ error: false, success: true, message: "Communication deleted successfully", data: {} }))
        .catch(error => sendResponse(res, 500, null, (error.message || error || error.error), false, true));
}


module.exports = {
    create,
    getCommunications,
    getById,
    update,
    _delete
};
