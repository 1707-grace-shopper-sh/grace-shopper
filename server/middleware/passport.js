const router = require('express').Router();
const passport = require('passport');

//if (process.env.NODE_ENV !== 'production') require('../secrets')

// passport registration DEFINING FUNCTIONS HERE
passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) =>
  db.models.user.findById(id)
    .then(user => done(null, user))
    .catch(done))


router.use(passport.initialize());
router.use(passport.session());


module.exports = router;