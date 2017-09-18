const router = require('express').Router();

// router.use('/users', require('./users')); // matches all requests to /api/users/

router.use('/products', require('./products'));

console.log('about to match to cart')
router.use('/cart', require('./cart'))
router.use('/reviews', require('./reviews'));
router.use('/auth', require('./auth'))

// if user requests an API route that doesn't exist
router.use(function (req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;