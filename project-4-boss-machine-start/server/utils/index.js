const db = require('../db');
const boom = require('@hapi/boom');

const attachInstanceToRequest = (req, res, next, instanceId, model, field = 'instanceId') => {
    const instance = db.getFromDatabaseById(model, instanceId);
    if (!instance || instance === null) {
        const {output: {statusCode, payload}} = boom.notFound();
        return res.status(statusCode).json(payload);
    }

    req.instance = instance;
    req[field] = instanceId;
    next(); 
};

const getInstances = (req, res, next, model) => {
    res.send(db.getAllFromDatabase(model));
};

const getInstanceById = (req, res, next, model) =>  {
    res.send(req.instance);
};

const addInstance = (req, res, next, model) => {
    const newInstance = db.addToDatabase(model, req.body);
    if (!newInstance || newInstance === null) {
        const {output: {statusCode, payload}} = boom.badRequest();
        return res.status(statusCode).json(payload);
    }

    res.status(201).json(newInstance);
};

const editInstance = (req, res, next, model) => {
    const editedInstance = db.updateInstanceInDatabase(model, req.body);
    if (!editedInstance || editedInstance === null) {
        const {output: {statusCode, payload}} = boom.badRequest();
        return res.status(statusCode).json(payload);
    }

    res.json(editedInstance);
};

const deleteInstance = (req, res, next, model, field='instanceId') => {
    const deleteResult = db.deleteFromDatabasebyId(model, req[field]);
    if (deleteResult) {
        return res.status(204).send();
    } else {
        const {output: {statusCode, payload}} = boom.badRequest();
        return res.status(statusCode).json(payload);
    }
}

const attachWorkToRequest = (req, res, next, workId) => {
    const work = db.getWorkByIdAndMinionId(req.minionId, workId);
    if(!work) {
        const {output: {statusCode, payload}} = boom.badRequest();
        return res.status(statusCode).json(payload);
    }

    req.work = work;
    req.workId = workId;
    next();
};

module.exports = {
    getInstances,
    attachInstanceToRequest,
    getInstanceById,
    addInstance,
    editInstance,
    deleteInstance,
    attachWorkToRequest
};