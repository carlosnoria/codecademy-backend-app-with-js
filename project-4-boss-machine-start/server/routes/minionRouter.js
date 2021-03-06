const router = require('express').Router();
const minionController = require('../controllers/minionController');
const workRouter = require('./workRouter');

module.exports = router;
router.param('minionId', minionController.attachMinionToRequest);
router.get('/', minionController.getMinions);
router.get('/:minionId', minionController.getMinionById);
router.post('/', minionController.addMinion);
router.put('/:minionId', minionController.editMinion);
router.delete('/:minionId', minionController.deleteMinion);
router.use('/:minionId/work', workRouter);