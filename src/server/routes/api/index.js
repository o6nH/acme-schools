const router = require('express').Router();

router.use('/students', require('./students'));
router.use('/schools', require('./schools'));
router.use('/sessions', require('./sessions'));

module.exports = router;