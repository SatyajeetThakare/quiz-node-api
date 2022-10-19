const express = require('express');
const userRoutes = require('express').Router();
const sessions = require('express-session');
const app = express();

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "longlivenodejsafterallitsjavascript3cheershiphiphurray",
    saveUninitialized: true,
    cookie: { maxAge: oneDay * 2 },
    resave: false
}));

const {
    authenticate,
    register,
    update,
    getUserNotifications
} = require('./user.controller');
const { isAuthenticated } = require('../../middlewares/isAuthenticated');

sessions.Session.prototype.authenticate = (req, user, cb) => {
    try {
        req.session.userInfo = user
        req.session.user = user.email
        cb();
    } catch (error) {
        cb(error);
    }
}

userRoutes.post('/users/authenticate', authenticate);
userRoutes.get('/users/getUserNotifications', isAuthenticated, getUserNotifications);
userRoutes.post('/users/register', register);
userRoutes.patch('/users/update', isAuthenticated, update);
// userRoutes.patch('/users/password', isAuthenticated, changeUserPasswordController);

module.exports = userRoutes;