const router = require('express').Router();

// Model
const {Student} = require('../../db/models/index.js');

// Routes
router.route('/')
  .post(async (req, res, next) => {
    try {
      // User sends /api/sessions json body: {email, password}
      if(req.body.email && req.body.password){
        const {email, password} = req.body;
        // Search for user by email and password
        const user = await Student.login(email, password);
        if(Object.keys(user).length) {
          try{
            // Set userId in Session Store (does not use res.cookie())
            req.session.userId = user.id;
            res.status(200).send(`New session, ${req.session.id},  was created for user ${user.firstName}.`);
          }
          catch (err) {
            res.status(404).send('Either cookies were not saved by the client/browser, or Session Store failed.');
          }
        }
        else res.status(401).send('Could not login user. Verify email and/or password, then Try again.');
      }
      else res.status(403).send('The server did not receive the email and/or password.'); 
    } 
    catch (err) {
      next(err);
    }
  })
  .get((req, res, next) => {
    try {
      if(req.session.userId) {
        res.send(req.session.userId);
      }
      else {
        res.status(403).redirect('/');
      }
    } 
    catch (err) {
      next(err)  
    }
  })
  .delete((req, res, next) => {
    try {
      if(req.session.userId) {
        req.session.destroy();
        res.status(204).redirect('/');
      }
      else {
        res.status(403).redirect('/');
      }
    } 
    catch (err) {
      next(err)
    }
  });

module.exports = router;
  