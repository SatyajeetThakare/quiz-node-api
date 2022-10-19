const routes = require('express').Router();
const {
  getPodcasts,
  informNewPodcastIsAvailable,
  readPodcasts
} = require('./podcast.controller');
const { isAuthenticated } = require('../../middlewares/isAuthenticated');

routes.get('/podcasts/getPodcasts', isAuthenticated, getPodcasts);
routes.post('/podcasts/informNewPodcastIsAvailable', isAuthenticated, informNewPodcastIsAvailable);
routes.get('/podcasts/readPodcasts', isAuthenticated, readPodcasts);

module.exports = routes;