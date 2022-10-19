const express = require('express');
const router = express.Router();
const ArticleService = require('./article.service');

const { sendResponse } = require('../../utils');
const { getUserId } = require('../../middlewares/isAuthenticated');

module.exports = router;

async function create(req, res, next) {
    try {
        req.body.createdBy = await getUserId(req);
        ArticleService.create(req.body).then((doc) => {
            res.json({ error: false, success: true, message: "Article created successfully", data: doc });
        }).catch(error => {
            sendResponse(res, 401, null, (error.message || error || error.error), false, true);
        });
    } catch (error) {
        sendResponse(res, 401, null, (error.message || error || error.error), false, true);
    }
}

async function getArticles(req, res, next) {
    try {
        const userId = await getUserId(req);
        console.log('userId', userId);
        let _filter = req.query.filter || {};
        _filter.isActive = true;
        ArticleService.getArticles(userId, req.body).then((doc) => {
            res.json({ error: false, success: true, message: "Articles fetched successfully", data: doc })
        }).catch(error => {
            sendResponse(res, 401, null, (error.message || error || error.error), false, true);
        });
    } catch (error) {
        sendResponse(res, 401, null, (error.message || error || error.error), false, true);
    }
}

async function getById(req, res, next) {
    try {
        const userId = await getUserId(req);
        ArticleService.getById(req.params.id, userId).then((doc) => {
            res.json({ error: false, success: true, message: "Article fetched successfully", data: doc })
        }).catch(error => {
            sendResponse(res, 401, null, (error.message || error || error.error), false, true);
        });   
    } catch (error) {
        sendResponse(res, 401, null, (error.message || error || error.error), false, true);
    }
}

async function update(req, res, next) {
    req.body.updatedBy = await getUserId(req);
    ArticleService.update(req.body)
        .then(() => res.json({ error: false, success: true, message: "Article updated successfully", data: {} }))
        .catch(error => sendResponse(res, 401, null, (error.message || error || error.error), false, true));
}

async function _delete(req, res, next) {
    ArticleService.delete(req.params.id)
        .then(() => res.json({ error: false, success: true, message: "Article deleted successfully", data: {} }))
        .catch(error => sendResponse(res, 401, null, (error.message || error || error.error), false, true));
}


module.exports = {
    create,
    getArticles,
    getById,
    update,
    _delete
};
