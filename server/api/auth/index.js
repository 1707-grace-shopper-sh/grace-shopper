'use strict'
const router = require('express').Router();
const db = require('../../db')
const User = db.models.user;


//Google Login
router.use('/google', require('./google'))


router.route('/')

  //Return current user
  .get('/me', (req, res, next) => {
    res.json(req.user);
  })

  //Local Login
  .post((req, res, next) => {
    User.findOrBuild({
      where: {
        email: req.body.email
      }
    })
      .spread((user, initialized) => {
        if (initialized) {
          user.password = req.body.password
        } else {
          throw new Error("It seems that there is already an account with this email")
        }
        return user
      })
      .then(user => {
        user.save()
        return user
      })
      .then(user => {
        console.log('user', user)
        req.login(user, err => err ? next(err) : res.json(user))
      })
      .catch(next)
  })



module.exports = router;