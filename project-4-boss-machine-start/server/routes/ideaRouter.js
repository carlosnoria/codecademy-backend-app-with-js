const router = require('express').Router();
const ideaController = require('../controllers/ideaController');
const checkMillionDollarIdea = require('../checkMillionDollarIdea');

module.exports = router;

router.param('ideaId', ideaController.attacIdeaToRequest);
router.get('/', ideaController.getIdeas);
router.get('/:ideaId', ideaController.getIdeaById);
router.post('/', checkMillionDollarIdea, ideaController.addIdea);
router.put('/:ideaId', checkMillionDollarIdea, ideaController.editIdea);
router.delete('/:ideaId', ideaController.deleteIdea);