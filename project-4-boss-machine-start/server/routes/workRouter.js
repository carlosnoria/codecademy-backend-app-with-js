const router = require('express').Router({mergeParams: true});
const workController = require('../controllers/workController');

module.exports = router;

router.param('workId', workController.attachWorkToRequest);
router.get('/', workController.getWorks);
router.post('/', workController.addWork);
router.put('/:workId', workController.editWork);
router.delete('/:workId', workController.deleteWork);

