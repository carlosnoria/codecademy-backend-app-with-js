const db = require('../db');
const utils = require('../utils');


const attachWorkToRequest = (req, res, next, workId) => {
    utils.attachWorkToRequest(req, res, next, workId, 'work', 'workId');
};

const addWork = (req, res, next) => {
    utils.addInstance(req, res, next, 'work');
};

const editWork = (req, res, next) => {
    utils.editInstance(req, res, next, 'work');
};

const getWorks = (req, res, next) => {
    res.send(db.getAllWorksByMinionId(req.minionId));
};

const deleteWork = (req, res, next) => {
    utils.deleteInstance(req, res, next, 'work', 'workId');
};



module.exports = {
    attachWorkToRequest,
    getWorks,
    addWork,
    editWork,
    deleteWork
};