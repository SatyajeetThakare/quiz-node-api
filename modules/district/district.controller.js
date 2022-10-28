const express = require('express');
const router = express.Router();
const DistrictService = require('./district.service');

const { sendResponse } = require('../../utils');
const { getUserId } = require('../../middlewares/isAuthenticated');

module.exports = router;

async function create(req, res, next) {
    try {
        req.body.createdBy = await getUserId(req);
        DistrictService.create(req.body).then((doc) => {
            res.json({ error: false, success: true, message: "District created successfully", data: doc });
        }).catch(error => {
            sendResponse(res, 500, null, (error.message || error || error.error), false, true);
        });
    } catch (error) {
        sendResponse(res, 500, null, (error.message || error || error.error), false, true);
    }
}

async function getDistricts(req, res, next) {
    try {
        const userId = await getUserId(req);
        let _filter = req.query.filter || {};
        _filter.isActive = true;
        DistrictService.getDistricts(userId, req.body).then((doc) => {
            res.json({ error: false, success: true, message: "Districts fetched successfully", data: doc })
        }).catch(error => {
            sendResponse(res, 500, null, (error.message || error || error.error), false, true);
        });
    } catch (error) {
        sendResponse(res, 500, null, (error.message || error || error.error), false, true);
    }
}

async function getByStateId(req, res, next) {
    try {
        const userId = await getUserId(req);
        const stateId = req.params.id;
        DistrictService.getByStateId(stateId).then((doc) => {
            res.json({ error: false, success: true, message: "Districts fetched successfully", data: doc })
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
        DistrictService.getById(req.params.id, userId).then((doc) => {
            res.json({ error: false, success: true, message: "District fetched successfully", data: doc })
        }).catch(error => {
            sendResponse(res, 500, null, (error.message || error || error.error), false, true);
        });   
    } catch (error) {
        sendResponse(res, 500, null, (error.message || error || error.error), false, true);
    }
}

async function update(req, res, next) {
    req.body.updatedBy = await getUserId(req);
    DistrictService.update(req.body)
        .then(() => res.json({ error: false, success: true, message: "District updated successfully", data: {} }))
        .catch(error => sendResponse(res, 500, null, (error.message || error || error.error), false, true));
}

async function _delete(req, res, next) {
    req.body.updatedBy = await getUserId(req);
    DistrictService.delete(req.params.id)
        .then(() => res.json({ error: false, success: true, message: "District deleted successfully", data: {} }))
        .catch(error => sendResponse(res, 500, null, (error.message || error || error.error), false, true));
}

module.exports = {
    create,
    getDistricts,
    getById,
    update,
    _delete,
    getByStateId
};
