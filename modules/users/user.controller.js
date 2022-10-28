const express = require('express');
const router = express.Router();
const UserService = require('./user.service');

const { getUserId } = require('../../middlewares/isAuthenticated');
const { sendResponse } = require('../../utils');

module.exports = router;

async function authenticate(req, res, next) {
    UserService.authenticate(req)
        .then((user) => {
            user ? res.json({ error: false, success: true, message: "User authenticated successfully", data: user }) :
                res.status(400).json({ message: 'Username or password is incorrect' })
        }).catch(error => {
            sendResponse(res, 500, null, (error.message || error || error.error), false, true);
        });
}

async function register(req, res, next) {
    UserService.create(req.body).then((doc) => {
        res.json({ error: false, success: true, message: "User created successfully", data: doc });
    }).catch(error => {
        sendResponse(res, 500, null, (error.message || error || error.error), false, true);
    });
}

async function getAll(req, res, next) {
    UserService.getAll()
        .then(doc => res.json({ error: false, success: true, message: "Users fetched successfully", data: doc }))
        .catch(error => sendResponse(res, 500, null, (error.message || error || error.error), false, true));
}

async function getUserNotifications(req, res, next) {
    let userId = await getUserId(req);
    UserService.getUserNotifications(userId)
        .then((user) => {
            res.json({ error: false, success: true, message: "User notifications fetched successfully", data: user })
        }).catch(error => sendResponse(res, 500, null, (error.message || error || error.error), false, true));
}

async function authMe(req, res, next) {
    let userId = await getUserId(req);
    UserService.getById(userId)
        .then(user => res.json({ error: false, success: true, message: "User fetched successfully", data: user }))
        .catch(err => sendResponse(res, 500, null, (error.message || error || error.error), false, true));
}

async function getById(req, res, next) {
    UserService.getById(req.params.id)
        .then(user => res.json({ error: false, success: true, message: "User fetched successfully", data: user }))
        .catch(err => sendResponse(res, 500, null, (error.message || error || error.error), false, true));
}

async function update(req, res, next) {
    req.body.updatedBy = await getUserId(req);
    UserService.update(req.params.id, req.body)
        .then((user) => res.json({ error: false, success: true, message: "User updated successfully", data: user }))
        .catch(err => sendResponse(res, 500, null, (error.message || error || error.error), false, true));
}

async function _delete(req, res, next) {
    UserService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => sendResponse(res, 500, null, (error.message || error || error.error), false, true));
}

module.exports = {
    authenticate,
    register,
    getAll,
    getUserNotifications,
    authMe,
    getById,
    update,
    _delete
};
