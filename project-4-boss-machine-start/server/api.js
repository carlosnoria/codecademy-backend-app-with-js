const express = require('express');
const apiRouter = express.Router();
const minionRouter = require('./routes/minionRouter');
const ideaRouter = require('./routes/ideaRouter');
const meetingRouter = require('./routes/meetingRouter');

apiRouter.use('/minions', minionRouter);
apiRouter.use('/ideas', ideaRouter);
apiRouter.use('/meetings', meetingRouter);

module.exports = apiRouter;
