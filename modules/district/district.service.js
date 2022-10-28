const db = require('../../_helpers/db');
const District = db.District;

module.exports = {
    getDistricts,
    getById,
    create,
    update,
    delete: _delete,
    getByStateId
};

function create(district) {
    return new Promise((resolve, reject) => {
        try {
            District.create(district, function (error, doc) {
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

function getDistricts(filter) {
    return new Promise(async (resolve, reject) => {
        try {
            District.find({ 'isActive': true })
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

function getByStateId(stateId) {
    return new Promise(async (resolve, reject) => {
        try {
            District.find({ state: stateId })
                .populate('createdBy', 'name')
                .populate('state', 'name')
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

function getById(districtId, userId) {
    return new Promise(async (resolve, reject) => {
        try {
            District.findOne({ _id: districtId })
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

function update(district) {
    return new Promise((resolve, reject) => {
        try {
            District.updateOne(
                { _id: district._id },
                district
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
            District.updateOne(
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