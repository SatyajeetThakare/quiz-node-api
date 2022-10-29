const allRoutes = require('express').Router();
const constants = require('../../constants/constants');

allRoutes.get('/', (req, res) => {
    console.log('Welcome!');
    res.json({
      message: constants.WELCOME_MSG
    })
})

const userRoutes = require('../../modules/users/user.routes');
const roleRoutes = require('../../modules/role/role.routes');
const eventRoutes = require('../../modules/event/event.routes');
const taskRoutes = require('../../modules/task/task.routes');
const articleRoutes = require('../../modules/article/article.routes');
const podcastRoutes = require('../../modules/podcast/podcast.routes');
const questionAndAnswerRoutes = require('../../modules/question-and-answer/question-and-answer.routes');
const stateRoutes = require('../../modules/state/state.routes');
const districtRoutes = require('../../modules/district/district.routes');
const schoolRoutes = require('../../modules/school/school.routes');
const topicRoutes = require('../../modules/topic/topic.routes');
const communicationRoutes = require('../../modules/communication/communication.routes');

allRoutes.use(userRoutes);
allRoutes.use(roleRoutes);
allRoutes.use(eventRoutes);
allRoutes.use(taskRoutes);
allRoutes.use(articleRoutes);
allRoutes.use(podcastRoutes);
allRoutes.use(questionAndAnswerRoutes);
allRoutes.use(stateRoutes);
allRoutes.use(districtRoutes);
allRoutes.use(schoolRoutes);
allRoutes.use(topicRoutes);
allRoutes.use(communicationRoutes);

module.exports = allRoutes;