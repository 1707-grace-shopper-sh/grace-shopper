const router = require('express').Router();


router.use('/products', require('./products'));

router.use('/cart', require('./cart'))
router.use('/reviews', require('./reviews'));
router.use('/auth', require('./auth'))
router.use('/orders', require('./orders'))

// if user requests an API route that doesn't exist
router.use(function (req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;