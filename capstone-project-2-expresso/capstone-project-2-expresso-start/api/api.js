const router = require('express').Router();
const employeeRouter = require('./employee');

router.use('/employees', employeeRouter);

module.exports = router;