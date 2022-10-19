const express = require('express');
const router = express.Router();
const UserService = require('./user.service');

const { getUserId } = require('../../middlewares/isAuthenticated');

module.exports = router;

async function authenticate(req, res, next) {
    UserService.authenticate(req)
        .then((user) => {
            user ? res.json({ error: false, success: true, message: "User authenticated successfully", data: user }) :
                res.status(400).json({ message: 'Username or password is incorrect' })
        }).catch(error => res.json({ error: false, success: true, message: (error || error.error) || error.message, data: {} }));
}

async function register(req, res, next) {
    UserService.create(req.body).then((doc) => {
        res.json({ error: false, success: true, message: "User created successfully", data: doc });
    }).catch(error => {
        res.json({ error: false, success: true, message: (error || error.error) || error.message, data: {} });
    });
}

async function getAll(req, res, next) {
    UserService.getAll()
        .then(doc => res.json({ error: false, success: true, message: "User fetched successfully", data: doc }))
        .catch(error => res.json({ error: false, success: true, message: (error || error.error) || error.message, data: {} }));
}

async function getUserNotifications(req, res, next) {
    let userId = await getUserId(req);
    UserService.getUserNotifications(userId)
        .then((user) => {
            res.json({ error: false, success: true, message: "User notifications fetched successfully", data: user })
        }).catch(error => res.json({ error: false, success: true, message: (error || error.error) || error.message, data: {} }));
}

async function getCurrent(req, res, next) {
    UserService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

async function getById(req, res, next) {
    UserService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

async function update(req, res, next) {
    UserService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

async function _delete(req, res, next) {
    UserService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

module.exports = {
    authenticate,
    register,
    getAll,
    getUserNotifications,
    getCurrent,
    getById,
    update,
    _delete
};
