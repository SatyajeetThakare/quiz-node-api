const db = require('../../_helpers/db');
const Article = db.Article;

module.exports = {
    getArticles,
    getById,
    create,
    update,
    delete: _delete,
    unseenArticles
};

function create(article) {
    return new Promise((resolve, reject) => {
        try {
            Article.create(article, function (error, doc) {
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

function getArticles(userId, allArticle) {
    return new Promise(async(resolve, reject) => {
        try {
            let result = await markAllArticlesAsSeen(userId);
            console.log('result', result);
            Article.find({ 'isActive': true })
                .populate('createdBy', 'name')
                .exec(function (error, doc) {
                    if (error) {
                        reject(error);
                    } else {
                        // Use this to get pure array of document object
                        let data = JSON.parse(JSON.stringify(doc));
                        // Add is viewed property to every article
                        let result = data.map((e) => ({
                            ...e,
                            isViewed: e.viewedBy.includes(userId)
                        }));
                        resolve(result);
                    }
                });
        } catch (error) {
            reject(error);
        }
    });
}

function getById(articleId, userId) {
    return new Promise(async(resolve, reject) => {
        try {
            let result = await markArticleAsSeen(articleId, userId);
            Article.findOne({ _id: articleId })
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

function update(article) {
    return new Promise((resolve, reject) => {
        try {
            Article.updateOne(
                { _id: article._id },
                { isCompleted: true, updatedBy: article.updatedBy }
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
            Article.updateOne(
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

function unseenArticles(userId) {
    return new Promise((resolve, reject) => {
        try {
            Article.find({ isActive: true, viewedBy: { $nin: [userId] } })
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

function markArticleAsSeen(articleId, userId) {
    return new Promise((resolve, reject) => {
        try {
            Article.updateOne(
                { _id: articleId },
                { $addToSet: { viewedBy: userId } }
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

function markAllArticlesAsSeen(userId) {
    return new Promise((resolve, reject) => {
        try {
            Article.updateMany(
                {},
                { $addToSet: { viewedBy: userId } }
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