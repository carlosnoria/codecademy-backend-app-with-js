const db = require('../db');
const utils = require('../utils');
const boom = require('@hapi/boom');

const getMeetings = (req, res, next) => {
    utils.getInstances(req, res, next, 'meetings');
};

const addMeeting = (req, res, next) => {
    const newMeeting = db.createMeeting();
    req.body = newMeeting;
    utils.addInstance(req, res, next, 'meetings');
}

const deleteMeetings = (req, res, next) => {
    const result = db.deleteAllFromDatabase('meetings');
    if(!result || result === null){
        const {output: {statusCode, payload}} = boom.badRequest();
        return res.status(statusCode).json(payload);
    }
    res.status(204).send();
}

module.exports = {
    getMeetings,
    addMeeting,
    deleteMeetings
}