const express = require('express');
const router = express.Router();
const PodcastService = require('./podcast.service');

const { sendResponse } = require('../../utils');
const { getUserId } = require('../../middlewares/isAuthenticated');

module.exports = router;

async function getPodcasts(req, res, next) {
    try {
        const userId = await getUserId(req);
        PodcastService.unseenPodcasts(userId).then((doc) => {
            res.json({ error: false, success: true, message: "Podcasts fetched successfully", data: doc })
        }).catch(error => {
            sendResponse(res, 500, null, (error.message || error || error.error), false, true);
        });
    } catch (error) {
        sendResponse(res, 500, null, (error.message || error || error.error), false, true);
    }
}

async function informNewPodcastIsAvailable(req, res, next) {
    try {
        const userId = await getUserId(req);
        podcast = {
            message: req.body.message,
            createdBy: userId
        }
        PodcastService.informNewPodcastIsAvailable(podcast).then((doc) => {
            res.json({ error: false, success: true, message: "Podcast notification created successfully", data: doc })
        }).catch(error => {
            sendResponse(res, 500, null, (error.message || error || error.error), false, true);
        });
    } catch (error) {
        sendResponse(res, 500, null, (error.message || error || error.error), false, true);
    }
}

async function readPodcasts(req, res, next) {
    try {
        const userId = await getUserId(req);
        PodcastService.readPodcasts(userId).then((doc) => {
            res.json({ error: false, success: true, message: "Podcasts marked as read successfully", data: doc })
        }).catch(error => {
            sendResponse(res, 500, null, (error.message || error || error.error), false, true);
        });   
    } catch (error) {
        sendResponse(res, 500, null, (error.message || error || error.error), false, true);
    }
}

module.exports = {
    getPodcasts,
    informNewPodcastIsAvailable,
    readPodcasts
};
