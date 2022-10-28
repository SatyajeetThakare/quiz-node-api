const express = require('express');
const router = express.Router();
const SchoolService = require('./school.service');

const { sendResponse } = require('../../utils');
const { getUserId } = require('../../middlewares/isAuthenticated');

module.exports = router;

async function create(req, res, next) {
    try {
        req.body.createdBy = await getUserId(req);
        SchoolService.create(req.body).then((doc) => {
            res.json({ error: false, success: true, message: "School created successfully", data: doc });
        }).catch(error => {
            sendResponse(res, 500, null, (error.message || error || error.error), false, true);
        });
    } catch (error) {
        sendResponse(res, 500, null, (error.message || error || error.error), false, true);
    }
}

async function getSchools(req, res, next) {
    try {
        const userId = await getUserId(req);
        let _filter = req.query.filter || {};
        _filter.isActive = true;
        SchoolService.getSchools(userId, req.body).then((doc) => {
            res.json({ error: false, success: true, message: "Schools fetched successfully", data: doc })
        }).catch(error => {
            sendResponse(res, 500, null, (error.message || error || error.error), false, true);
        });
    } catch (error) {
        sendResponse(res, 500, null, (error.message || error || error.error), false, true);
    }
}

async function getByDistrictId(req, res, next) {
    try {
        const userId = await getUserId(req);
        const stateId = req.params.id;
        SchoolService.getByDistrictId(stateId).then((doc) => {
            res.json({ error: false, success: true, message: "Schools fetched successfully", data: doc })
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
        SchoolService.getById(req.params.id, userId).then((doc) => {
            res.json({ error: false, success: true, message: "School fetched successfully", data: doc })
        }).catch(error => {
            sendResponse(res, 500, null, (error.message || error || error.error), false, true);
        });   
    } catch (error) {
        sendResponse(res, 500, null, (error.message || error || error.error), false, true);
    }
}

async function update(req, res, next) {
    req.body.updatedBy = await getUserId(req);
    SchoolService.update(req.body)
        .then(() => res.json({ error: false, success: true, message: "School updated successfully", data: {} }))
        .catch(error => sendResponse(res, 500, null, (error.message || error || error.error), false, true));
}

async function _delete(req, res, next) {
    req.body.updatedBy = await getUserId(req);
    SchoolService.delete(req.params.id)
        .then(() => res.json({ error: false, success: true, message: "School deleted successfully", data: {} }))
        .catch(error => sendResponse(res, 500, null, (error.message || error || error.error), false, true));
}

module.exports = {
    create,
    getSchools,
    getById,
    update,
    _delete,
    getByDistrictId
};
