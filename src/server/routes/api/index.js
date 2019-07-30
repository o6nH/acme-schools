const router = require('express').Router();

/* Callback paramater is array of two middleware functions (second of which is router middleware). 
If the first finds `userId` has a session via req.session, the second will route to a specified 
`routePath` because next() is called, otherwise the response will end with a 401 status. */
const authorized = routePath => [(req, res, next) => req.session.userId 
  ? next() : res.status(401).end(), require(routePath)]

router.use('/students', authorized('./students'));
router.use('/schools', authorized('./schools'));
router.use('/sessions', require('./sessions'));

module.exports = router;