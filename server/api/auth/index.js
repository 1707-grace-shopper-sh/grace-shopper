'use strict'
const router = require('express').Router();
const db = require('../../db')
const User = db.models.user;


//Google Login
router.use('/google', require('./google'))

router.get('/me', (req, res, next) => {
  res.json(req.user);
})


//Local Login
router.post('/create', (req, res, next) => {
  User.findOrBuild({
    where: {
      email: req.body.email
    }
  })
    .spread((user, initialized) => {
      if (initialized) {
        user.password = req.body.password
      } else {
        res.status(401).send('User already exists')        
      }
      return user
    })
    .then(user => {
      return user.save()
    })
    .then(user => {
      req.login(user, err => err ? next(err) : res.json(user))
    })
    .catch(next)
})

router.post('/login', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
    }
  })
    .then(user => {
      if (!user) {
        res.status(401).send('User not found')
      } else if (!user.correctPassword(req.body.password)) {
        res.status(401).send('Incorrect password')
      } else {
        req.login(user, err => err ? next(err) : res.json(user))
      }
    })
    .catch(nexst)
})



module.exports = router;