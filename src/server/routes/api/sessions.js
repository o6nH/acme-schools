const router = require('express').Router();
const {Student} = require('../../db/models/index.js');

router.route('/')
  .post(async (req, res, next) => {
    try {
      // User sends /api/sessions json body: {email, password}
      if(req.body.email && req.body.password){
        const {email, password} = req.body;
        // Search for user by email and password
        const user = await Student.login(email, password);
        // Create session
        if(Object.keys(user).length) {
          try{
            req.session.userId = user.id; // req.session is the Sequelize Session Store/Model;
            res.send(`New session, ${req.session.id},  was created for user ${user.firstName}.`);
          }
          catch (err) {
            res.send('Either cookies were not saved by the client/browser, or Session Store failed.');
          }
        }
        else res.send('Could not login user. Verify email and/or password, then Try again.');
      }
      else res.send('The server did not receive the email and/or password.'); 
    } 
    catch (err) {
      next(err);
    }
  })
  .get((req, res, next) => {
    try {
      if(req.session.cookie) {
        res.send(req.session.userId);
      }
      else {
        res.redirect('/');
      }
    } 
    catch (err) {
      next(err)  
    }
  })
  .delete((req, res, next) => {

  });

module.exports = router;
  