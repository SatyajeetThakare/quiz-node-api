module.exports.getUserRole = function(req, res, next) {
    // console.log('req.session', req.session);
    return req.session.userInfo.role;
}
