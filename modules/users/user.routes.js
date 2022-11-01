const express = require('express');
const userRoutes = require('express').Router();
const sessions = require('express-session');
const app = express();
const multer = require('multer');
const upload = multer();

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
    uploadProfilePicture,
    getAll,
    getAllSeekers,
    getUserNotifications,
    getById,
    authMe,
    getMentorsByTopicId,
    getUnverifiedUsers
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
userRoutes.get('/users/getAll', isAuthenticated, getAll);
userRoutes.get('/users/getAllSeekers', isAuthenticated, getAllSeekers);
userRoutes.get('/users/authMe', isAuthenticated, authMe);
userRoutes.get('/users/getById/:id', isAuthenticated, getById);
userRoutes.post('/users/register', register);
userRoutes.put('/users/update/:id', isAuthenticated, update);
userRoutes.put('/users/uploadProfilePicture', upload.single(`file`), uploadProfilePicture);
userRoutes.get('/users/getMentorsByTopicId/:id', isAuthenticated, getMentorsByTopicId);
userRoutes.get('/users/getUnverifiedUsers', isAuthenticated, getUnverifiedUsers);
// userRoutes.patch('/users/password', isAuthenticated, changeUserPasswordController);

module.exports = userRoutes;