const db = require('../db');
const utils = require('../utils');

const attacIdeaToRequest = (req, res, next, ideaId) => {
    utils.attachInstanceToRequest(req, res, next, ideaId, 'ideas');
};

const getIdeas = (req, res, next) => {
    utils.getInstances(req, res, next, 'ideas');
};

const getIdeaById = (req, res, next) =>  {
    utils.getInstanceById(req, res, next, 'ideas');
};

const addIdea = (req, res, next) => {
    utils.addInstance(req, res, next, 'ideas');
};

const editIdea = (req, res, next) => {
    utils.editInstance(req, res, next, 'ideas');
};

const deleteIdea = (req, res, next) => {
    utils.deleteInstance(req, res, next, 'ideas');
};

module.exports = {
    getIdeas,
    attacIdeaToRequest,
    getIdeaById,
    addIdea,
    editIdea,
    deleteIdea
};