// const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../../_helpers/db');
const Token = db.Token;

module.exports = {
    getToken,
    create
};

function create(token) {
    return new Promise((resolve, reject) => {
        try {
            Token.update({
                email: token.email
            },
            token, {
                upsert: true,
                setDefaultsOnInsert: true
            }, function (error, doc) {
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

async function getToken(token) {
    return await Token.findOne(token);
}