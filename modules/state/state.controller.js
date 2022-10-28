const express = require('express');
const router = express.Router();
const StateService = require('./state.service');

const { sendResponse } = require('../../utils');
const { getUserId } = require('../../middlewares/isAuthenticated');

module.exports = router;

async function create(req, res, next) {
    try {
        req.body.createdBy = await getUserId(req);
        StateService.create(req.body).then((doc) => {
            res.json({ error: false, success: true, message: "State created successfully", data: doc });
        }).catch(error => {
            sendResponse(res, 500, null, (error.message || error || error.error), false, true);
        });
    } catch (error) {
        sendResponse(res, 500, null, (error.message || error || error.error), false, true);
    }
}

async function getStates(req, res, next) {
    try {
        const userId = await getUserId(req);
        let _filter = req.query.filter || {};
        _filter.isActive = true;
        StateService.getStates(userId, req.body).then((doc) => {
            res.json({ error: false, success: true, message: "States fetched successfully", data: doc })
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
        StateService.getById(req.params.id, userId).then((doc) => {
            res.json({ error: false, success: true, message: "State fetched successfully", data: doc })
        }).catch(error => {
            sendResponse(res, 500, null, (error.message || error || error.error), false, true);
        });   
    } catch (error) {
        sendResponse(res, 500, null, (error.message || error || error.error), false, true);
    }
}

async function update(req, res, next) {
    req.body.updatedBy = await getUserId(req);
    StateService.update(req.body)
        .then(() => res.json({ error: false, success: true, message: "State updated successfully", data: {} }))
        .catch(error => sendResponse(res, 500, null, (error.message || error || error.error), false, true));
}

async function _delete(req, res, next) {
    req.body.updatedBy = await getUserId(req);
    StateService.delete(req.params.id)
        .then(() => res.json({ error: false, success: true, message: "State deleted successfully", data: {} }))
        .catch(error => sendResponse(res, 500, null, (error.message || error || error.error), false, true));
}

module.exports = {
    create,
    getStates,
    getById,
    update,
    _delete
};
