const db = require('../../_helpers/db');
const Communication = db.Communication;
const { groupByKey } = require('../../utils/arrayMethods');

module.exports = {
    getCommunications,
    getById,
    create,
    update,
    delete: _delete,
    markCommunicationsAsSeen,
    unseenCommunications,
    getUnseenCommunications
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
    console.log(createdBy, to);
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