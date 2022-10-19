const db = require('../../_helpers/db');
const Task = db.Task;

module.exports = {
    getTasks,
    getById,
    create,
    update,
    delete: _delete
};

function create(task) {
    return new Promise((resolve, reject) => {
        try {
            Task.create(task, function (error, doc) {
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

function getTasks(taskFilter) {
    return new Promise((resolve, reject) => {
        try {
            Task.find(taskFilter).exec(function (error, doc) {
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

function getById(taskId) {
    return new Promise((resolve, reject) => {
        try {
            Task.findOne({ _id: taskId }).exec(function (error, doc) {
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

function update(task) {
    return new Promise((resolve, reject) => {
        try {
            Task.updateOne({ _id: task._id }, { isCompleted: true, updatedBy: task.updatedBy }).exec(function (error, doc) {
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
            Task.updateOne({ _id: id }, { isActive: false }).exec(function (error, doc) {
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