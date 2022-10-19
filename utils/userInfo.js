const session = require('express-session');

module.exports.getUserInfo = function(req, res, next) {
    console.log('req.session', req.session);
    return req.session.userInfo;
}