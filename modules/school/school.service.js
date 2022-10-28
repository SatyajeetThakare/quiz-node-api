const db = require('../../_helpers/db');
const School = db.School;

module.exports = {
    getSchools,
    getById,
    create,
    update,
    delete: _delete,
    getByDistrictId
};

function create(school) {
    return new Promise((resolve, reject) => {
        try {
            School.create(school, function (error, doc) {
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

function getSchools(filter) {
    return new Promise(async (resolve, reject) => {
        try {
            School.find({ 'isActive': true })
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

function getByDistrictId(districtId) {
    return new Promise(async (resolve, reject) => {
        try {
            School.find({ district: districtId })
                .populate('createdBy', 'name')
                .populate('district', 'name')
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

function getById(schoolId, userId) {
    return new Promise(async (resolve, reject) => {
        try {
            School.findOne({ _id: schoolId })
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

function update(school) {
    return new Promise((resolve, reject) => {
        try {
            School.updateOne(
                { _id: school._id },
                school
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
            School.updateOne(
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