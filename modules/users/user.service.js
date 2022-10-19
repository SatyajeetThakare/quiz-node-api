const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../../_helpers/db');
const User = db.User;
const TokenService = require('../token/token.service');
const config = require('../../config/config');
const { sendResponse } = require('../../utils');

const { getUserId } = require('../../middlewares/isAuthenticated');
const { checkIfQuestionsAreUnanswered } = require('../question-and-answer/question-and-answer.service');
const { unseenArticles } = require('../article/article.service');
const { unseenPodcasts } = require('../podcast/podcast.service');

module.exports = {
    authenticate,
    getAll,
    getById,
    getUserNotifications,
    create,
    update,
    delete: _delete
};

function authenticate(req) {
    return new Promise(async (resolve, reject) => {
        try {
            let { email, password } = req.body;
            console.log('In authenticate');
            const user = await User.findOne({ email });

            if (user) {
                if (user && bcrypt.compareSync(password, user.hash)) {

                    const token = jwt.sign({ id: user._id, email: user.email }, process.env.TOKEN_SECRET, { expiresIn: config.token.validity });

                    req.session.authenticate(req, user, (err) => {
                        if (err) return handleError(err, req, res, next)
                    })

                    let userDoc = {
                        ...user.toJSON(),
                        token
                    };

                    // Store a user specific token in DB
                    TokenService.create({ email: userDoc.email, token: token }).then((doc) => {
                        resolve(userDoc);
                    }).catch(error => {
                        console.log('error', error);
                        reject(error);
                    });
                } else {
                    reject('Invalid credentials');
                }
            } else {
                reject('You are not registered with us, please register to use services');
            }
        } catch (error) {
            console.log('error', error);
            reject(error);
        }
    });
}

async function getAll() {
    return await User.find();
}

async function getUserNotifications(userId) {
    try {
        let notification;
        const unansweredQuestions = await checkIfQuestionsAreUnanswered(userId);
        const unseenArticlesList = await unseenArticles(userId);
        const unseenPodcastsList = await unseenPodcasts(userId);
        notification = {
            unansweredQuestions: unansweredQuestions.length,
            unseenArticles: unseenArticlesList.length,
            unseenPodcasts: unseenPodcastsList.length
        }
        return notification;
    } catch (error) {
        sendResponse(res, 500, null, (error.message || error || error.error), false, true);
    }
}

async function getById(id) {
    return await User.findById(id);
}

function create(userParam) {
    return new Promise((resolve, reject) => {
        try {
            const user = new User(userParam);

            // hash password
            if (userParam.password) {
                user.hash = bcrypt.hashSync(userParam.password, 10);
            }

            User.create(user, function (error, doc) {
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

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.email !== userParam.email && await User.findOne({ email: userParam.email })) {
        throw 'Username "' + userParam.email + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}