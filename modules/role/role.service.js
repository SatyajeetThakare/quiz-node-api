// const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../../_helpers/db');
const Role = db.Role;

module.exports = {
    getAll,
    // getById,
    create,
    // update,
    // delete: _delete
};

function create(role) {
    return new Promise((resolve, reject) => {
        try {
            Role.create(role, function (error, doc) {
                if (error) {
                    reject(error);
                } else {
                    resolve(doc);
                }
            });
        } catch (error) {
            reject(error);
        }
    });
}

function getAll(allRole) {
    return new Promise((resolve, reject) => {
        try {
            Role.find({ 'isActive': true }).exec(function (error, doc) {
                if (error) {
                    reject(error);
                } else {
                    resolve(doc);
                }
            });
        } catch (error) {
            reject(error);
        }
    });
}