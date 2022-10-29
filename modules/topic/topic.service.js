const db = require('../../_helpers/db');
const Topic = db.Topic;

module.exports = {
    getTopics,
    getById,
    create,
    update,
    delete: _delete
};

function create(topic) {
    return new Promise((resolve, reject) => {
        try {
            Topic.create(topic, function (error, doc) {
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

function getTopics(userId, allTopic) {
    return new Promise(async(resolve, reject) => {
        try {
            Topic.find({ 'isActive': true })
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

function getById(topicId, userId) {
    return new Promise(async(resolve, reject) => {
        try {
            Topic.findOne({ _id: topicId })
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

function update(topic) {
    return new Promise((resolve, reject) => {
        try {
            Topic.updateOne(
                { _id: topic._id },
                topic
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
            Topic.updateOne(
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