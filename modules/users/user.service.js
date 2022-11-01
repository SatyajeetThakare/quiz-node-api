const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../../_helpers/db');
const User = db.User;
const TokenService = require('../token/token.service');
const config = require('../../config/config');
const { sendResponse } = require('../../utils');

require('dotenv').config();
const AWS = require('aws-sdk');
const ID = process.env.ID;
const SECRET = process.env.SECRET;
// The name of the bucket that you have created
const BUCKET_NAME = process.env.BUCKET_NAME;
const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

const params = {
    Bucket: BUCKET_NAME,
    CreateBucketConfiguration: {
        // Set your region here
        LocationConstraint: "us-east-1"
    }
};

const { getUserId } = require('../../middlewares/isAuthenticated');
const { checkIfQuestionsAreUnanswered } = require('../question-and-answer/question-and-answer.service');
const { unseenCommunications } = require('../communication/communication.service');
const { unseenPodcasts } = require('../podcast/podcast.service');

module.exports = {
    authenticate,
    getAll,
    getById,
    getUserNotifications,
    create,
    update,
    uploadProfilePicture,
    delete: _delete,
    getMentorsByTopicId,
    getUnverifiedUsers,
    getAdminEmails
};

function authenticate(req) {
    return new Promise(async (resolve, reject) => {
        try {
            let { email, password } = req.body;
            console.log('In authenticate');
            const user = await User.findOne({ email });

            if (user) {
                if (user && bcrypt.compareSync(password, user.hash)) {

                    const rolesToBeVerified = [2];
                    const needVerification = rolesToBeVerified.includes(user.role);
                    if (needVerification && !user.isVerified) {
                        reject('User is not verified yet');
                    }

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

async function getAll(filter) {
    return await User.find(filter);
}

async function getUnverifiedUsers() {
    return new Promise((resolve, reject) => {
        User.find({ 'isActive': true, role: 2, $or: [{ isVerified: false }, { isVerified: { $exists: false } }] })
            .populate('role', 'name')
            .exec(function (error, doc) {
                if (error) {
                    reject(error);
                } else {
                    resolve(doc);
                }
            });
    });
}

function getAdminEmails() {
    return new Promise((resolve, reject) => {
        User.find({ 'isActive': true, role: 1 })
            .project({ email: 1 })
            .exec(function (error, doc) {
                if (error) {
                    reject(error);
                } else {
                    resolve(doc);
                }
            });
    });
}

async function getUserNotifications(userId) {
    try {
        let notification;
        // const unansweredQuestions = await checkIfQuestionsAreUnanswered(userId);
        const unseenCommunicationsList = await unseenCommunications(userId);
        // const unseenPodcastsList = await unseenPodcasts(userId);
        notification = {
            // unansweredQuestions: unansweredQuestions.length,
            unseenCommunications: unseenCommunicationsList.length,
            // unseenPodcasts: unseenPodcastsList.length
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
            const rolesDoNotNeedVerification = [1, 3];
            const user = new User(userParam);
            user.isVerified = rolesDoNotNeedVerification.includes(user.role);
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
    return user;
}

async function uploadProfilePicture(userId, userParam) {

    return new Promise(async (resolve, reject) => {
        let userUpdateResult = await update(userId, userParam);
        if (userUpdateResult) {
            let fileUploadResult = await uploadFile(userParam);
            User.updateOne(
                { _id: userId },
                { profilePicDetails: fileUploadResult }
            ).exec(function (error, doc) {
                if (error) {
                    reject(error);
                } else {
                    resolve(doc);
                }
            });
        }
    });
}

const uploadFile = (req) => {
    return new Promise(async (resolve, reject) => {
        let file = req.file;
        let fileName = `${(new Date().toJSON().slice(0, 19))}_` + file.originalname;
        // Read content from the file
        const fileContent = file.buffer.toString();
        // const fileContent = fs.readFileSync(file.originalname, 'utf8');

        // Setting up S3 upload parameters
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: fileName, // File name you want to save as in S3
            Body: file.buffer
        };

        // Uploading files to the bucket
        s3.upload(params, function (error, data) {
            if (error) {
                reject(error);
            }
            resolve(data);
        });
    });
};

async function _delete(id) {
    await User.findByIdAndRemove(id);
}

function getMentorsByTopicId(topicId) {
    return new Promise(async (resolve, reject) => {
        try {
            let topics = [];
            topics.push(Number(topicId));

            User.find({ isActive: true, topics: { $in: topics } })
                .populate('topics', 'name')
                .populate('createdBy', 'name')
                .exec(function (error, doc) {
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