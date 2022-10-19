const express = require('express');
const router = express.Router();
const TaskService = require('./task.service');

const { sendResponse } = require('../../utils');
const { getUserId } = require('../../middlewares/isAuthenticated');

module.exports = router;

async function create(req, res, next) {
    try {
        req.body.createdBy = await getUserId(req);
        console.log('req.body', req.body);
        TaskService.create(req.body).then((doc) => {
            res.json({ error: false, success: true, message: "Task created successfully", data: doc });
        }).catch(error => {
            sendResponse(res, 401, null, (error.message || error || error.error), false, true);
        });
    } catch (error) {
        sendResponse(res, 401, null, (error.message || error || error.error), false, true);
    }
}

async function getTasks(req, res, next) {
    try {
        let _filter = req.query.filter || {};
        _filter.createdBy = await getUserId(req);
        _filter.isActive = true;

        TaskService.getTasks(_filter).then((doc) => {
            res.json({ error: false, success: true, message: "Tasks fetched successfully", data: doc })
        }).catch(error => {
            sendResponse(res, 401, null, (error.message || error || error.error), false, true);
        });
    } catch (error) {
        console.log('error', error);
        sendResponse(res, 401, null, (error.message || error || error.error), false, true);
    }
}

async function getById(req, res, next) {
    TaskService.getById(req.params.id).then((doc) => {
        res.json({ error: false, success: true, message: "Task fetched successfully", data: doc })
    }).catch(error => {
        next(error);
    });
}

async function update(req, res, next) {
    req.body.updatedBy = await getUserId(req);
    TaskService.update(req.body)
        .then(() => res.json({ error: false, success: true, message: "Tasks updated successfully", data: {} }))
        .catch(error => sendResponse(res, 401, null, (error.message || error || error.error), false, true));
}

async function _delete(req, res, next) {
    TaskService.delete(req.params.id)
        .then(() => res.json({ error: false, success: true, message: "Tasks deleted successfully", data: {} }))
        .catch(error => sendResponse(res, 401, null, (error.message || error || error.error), false, true));
}

module.exports = {
    create,
    getTasks,
    getById,
    update,
    _delete
};
