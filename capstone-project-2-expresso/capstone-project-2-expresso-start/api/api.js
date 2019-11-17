const router = require('express').Router();
const employeeRouter = require('./employee');
const timesheetRouter = require('./timesheet');

router.use('/employees', employeeRouter);

module.exports = router;