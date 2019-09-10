const router = require('express').Router();
const meetingController = require('../controllers/meetingController');

module.exports = router;

router.get('/', meetingController.getMeetings);
router.post('/', meetingController.addMeeting);
router.delete('/', meetingController.deleteMeetings);