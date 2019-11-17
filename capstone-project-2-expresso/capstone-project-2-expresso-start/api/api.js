const router = require('express').Router();
const employeeRouter = require('./employee');
const menuRouter = require('./menu');

router.use('/employees', employeeRouter);
router.use('/menus', menuRouter);

module.exports = router;