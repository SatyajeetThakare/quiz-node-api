const db = require('../../_helpers/db');
const Communication = db.Communication;
const User = db.User;

const { groupByKey } = require('../../utils/arrayMethods');
const { getAdminEmails } = require('../users/user.service');
const { getAll } = require('../users/user.service');

require('dotenv').config()
var nodemailer = require('nodemailer');

const transport = {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.SOME,
        pass: process.env.PAST
    }
}
var transporter = nodemailer.createTransport(transport);

module.exports = {
    getCommunications,
    getById,
    create,
    update,
    delete: _delete,
    markCommunicationsAsSeen,
    unseenCommunications,
    getUnseenCommunications,
    sendContactUsEmail
};

function create(communication) {
    return new Promise((resolve, reject) => {
        try {
            Communication.create(communication, function (error, doc) {
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

function getCommunications(topicId, senderId, mentorId, _filter) {
    return new Promise(async (resolve, reject) => {
        try {
            Communication.find({
                $or: [{ 'isActive': true, topic: topicId, 'createdBy': senderId, 'to': mentorId },
                { 'isActive': true, topic: topicId, 'createdBy': mentorId, 'to': senderId }]
            })
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

function getById(communicationId, userId) {
    return new Promise(async (resolve, reject) => {
        try {
            Communication.findOne({ _id: communicationId })
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

function update(communication) {
    return new Promise((resolve, reject) => {
        try {
            Communication.updateOne(
                { _id: communication._id },
                communication
            ).exec(function (error, doc) {
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

function _delete(id) {
    return new Promise((resolve, reject) => {
        try {
            Communication.updateOne(
                { _id: id },
                { isActive: false }
            ).exec(function (error, doc) {
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

function unseenCommunications(userId) {
    return new Promise((resolve, reject) => {
        try {
            Communication.find(
                { 'isActive': true, 'to': Number(userId), $or: [{ isViewed: false }, { isViewed: { $exists: false } }] }
                // {
                //     $and: [
                //         {
                //             $or: [{ isViewed: false }, { isViewed: { $exists: false } }]
                //         },
                //         { 'isActive': true, 'to': Number(userId) }
                //     ]
                // }
            ).populate('createdBy', 'name').exec(function (error, doc) {
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

function getUnseenCommunications(userId) {
    return new Promise(async (resolve, reject) => {
        try {
            const unseenCommunicationsList = await unseenCommunications(Number(userId));
            const unseenCommunicationsListByUsers = await groupByKey(unseenCommunicationsList);
            resolve(unseenCommunicationsListByUsers);
        } catch (error) {
            reject(error);
        }
    });
}

function markCommunicationsAsSeen(createdBy, to) {
    return new Promise((resolve, reject) => {
        try {
            Communication.updateMany(
                { createdBy: Number(createdBy), to: Number(to) },
                { isViewed: true }
            ).exec(function (error, doc) {
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


function sendContactUsEmail(email) {
    return new Promise(async (resolve, reject) => {

        let adminEmails = [];
        User.find({ 'isActive': true, role: 1 }, { email: 1, _id: 0 })
            .exec(function (error, doc) {
                if (error) {
                    reject(error);
                } else {
                    adminEmails = doc.map(e => e.email);
                    var mailOptions = {
                        from: email?.email,
                        to: adminEmails,
                        subject: process.env.CONTACT_US_EMAIL_SUBJECT,
                        text: `${email.message}
                        From ${email.name.firstName} ${email.name.lastName}
                        ${email.email}`
                    };
                    
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            reject(error);
                        } else {
                            resolve({});
                        }
                    });
                }
            });
    });
}