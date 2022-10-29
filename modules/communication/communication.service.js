const db = require('../../_helpers/db');
const Communication = db.Communication;

module.exports = {
    getCommunications,
    getById,
    create,
    update,
    delete: _delete,
    markCommunicationsAsViewed,
    unseenCommunications
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

function getCommunications(userId, mentorId, _filter) {
    return new Promise(async (resolve, reject) => {
        try {
            Communication.find({ 'isActive': true, createdBy: userId, to: mentorId })
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
            Communication.find({ isActive: true, to: userId, isViewed: false, isViewed: { $exists: false } })
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

function markCommunicationsAsViewed(userId, to) {
    return new Promise((resolve, reject) => {
        try {
            Communication.update(
                { createdBy: userId, to: to },
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