const db = require('../db');
const utils = require('../utils');

const attachMinionToRequest = (req, res, next, minionId) => {
    utils.attachInstanceToRequest(req, res, next, minionId, 'minions', 'minionId');
};

const getMinions = (req, res, next) => {
    utils.getInstances(req, res, next, 'minions');
};

const getMinionById = (req, res, next) =>  {
    utils.getInstanceById(req, res, next, 'minions');
};

const addMinion = (req, res, next) => {
    utils.addInstance(req, res, next, 'minions');
};

const editMinion = (req, res, next) => {
    utils.editInstance(req, res, next, 'minions');
};

const deleteMinion = (req, res, next) => {
    utils.deleteInstance(req, res, next, 'minions', 'minionId');
};

module.exports = {
    getMinions,
    attachMinionToRequest,
    getMinionById,
    addMinion,
    editMinion,
    deleteMinion
};