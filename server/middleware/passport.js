const router = require('express').Router();
const passport = require('passport');

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser((user, done) => {
  // try {
  //   done(null, user.id);
  // } catch (err) {
  //   done(err);
  // }
});

passport.deserializeUser((id, done) => {
  // User.findById(id)
  //   .then(user => done(null, user))
  //   .catch(done);
});

module.exports = router;