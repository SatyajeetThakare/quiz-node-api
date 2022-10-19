const db = require('../../_helpers/db');
const Podcast = db.Podcast;

module.exports = {
    informNewPodcastIsAvailable,
    readPodcasts,
    unseenPodcasts
};

function informNewPodcastIsAvailable(podcast) {
    return new Promise((resolve, reject) => {
        try {
            Podcast.create(podcast, function (error, doc) {
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

function readPodcasts(userId) {
    return new Promise(async (resolve, reject) => {
        try {
            Podcast.updateMany(
                { 'isActive': true },
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

function unseenPodcasts(userId) {
    return new Promise((resolve, reject) => {
        try {
            Podcast.find(
                { isActive: true, viewedBy: { $nin: [userId] } }
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