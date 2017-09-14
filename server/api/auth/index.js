const router = require('express').Router();





router.get('/me', (req, res, next) => {
  res.json(req.user);
});

router.use('/google', require('./google'))


module.exports = router;