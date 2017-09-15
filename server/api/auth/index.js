const router = require('express').Router();


router.get('/me', (req, res, next) => {
  res.json(req.user);
});

//if we want more than just cart but other info about non logged in user on front end we could add to the /me route that functionality; if we want only the cart, maybe another function/route


router.use('/google', require('./google'))


module.exports = router;