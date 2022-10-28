const db = require('../../_helpers/db');
const State = db.State;

module.exports = {
    getStates,
    getById,
    create,
    update,
    delete: _delete
};

function create(state) {
    return new Promise((resolve, reject) => {
        try {
            State.create(state, function (error, doc) {
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

function getStates(filter) {
    return new Promise(async (resolve, reject) => {
        try {
            State.find({ 'isActive': true })
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

function getById(stateId, userId) {
    return new Promise(async (resolve, reject) => {
        try {
            State.findOne({ _id: stateId })
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

function update(state) {
    return new Promise((resolve, reject) => {
        try {
            State.updateOne(
                { _id: state._id },
                state
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
            State.updateOne(
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