const router = require('express').Router();

// router.use('/users', require('./users')); // matches all requests to /api/users/
router.use('/login', require('./sessions/login')); // matches all requests to  /api/login
router.use('/signup', require('./sessions/signup'));
router.use('/logout', require('./sessions/logout'));
router.use('/getme', require('./sessions/getme'));
router.use('/products', require('./products'));

// if user requests an API route that doesn't exist
router.use(function (req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;