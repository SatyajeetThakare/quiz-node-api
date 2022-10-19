const express = require('express');
const router = express.Router();
const RoleService = require('./role.service');

module.exports = router;

async function create(req, res, next) {
    RoleService.create(req.body).then((doc) => {
        res.json({ error: false, success: true, message: "Role created successfully", data: doc })
    }).catch(error => {
        next(error);
    });
}

async function getAll(req, res, next) {

    let _filter = req.query.filter
    let allRole = {}

    if (_filter) {
      allRole = JSON.parse(_filter)
    }

    // console.log('req?.session', req?.session);
    // req.body.createdBy = req?.session?.userInfo && req.session.userInfo._id || 1;

    RoleService.getAll(req.body).then((doc) => {
        res.json({ error: false, success: true, message: "Roles fetched successfully", data: doc })
    }).catch(error => {
        next(error);
    });
}

async function getById(req, res, next) {
    // RoleService.getById(req.params.id)
    //     .then(user => user ? res.json(user) : res.sendStatus(404))
    //     .catch(err => next(err));
}

async function update(req, res, next) {
    // RoleService.update(req.params.id, req.body)
    //     .then(() => res.json({}))
    //     .catch(err => next(err));
}

async function _delete(req, res, next) {
    // RoleService.delete(req.params.id)
    //     .then(() => res.json({}))
    //     .catch(err => next(err));
}

module.exports = {
    create,
    getAll,
    getById,
    update,
    _delete
};
