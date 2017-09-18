'use strict'
const router = require('express').Router();
const db = require('../../db')
const User = db.models.user;
const Order = db.models.order


//Google Login
router.use('/google', require('./google'))

router.get('/me', (req, res, next) => {
  function ifThen(){
    if(req.user){
       return Order.update(
      {user: req.user.id},
      {
        where: { session: req.session.id },
        returning: true
      })
    } else {
      return Order.findAll({where: {
        session: req.session.ide
      }})
    }
  }  
  ifThen()
    .then(orders=>{
      console.log('orders', orders)
      const userInfo = {
        orders: orders,
        userData: req.user
      }
      res.json(userInfo)
    })
})


//Local sign up
router.post('/create', (req, res, next) => {
  User.findOrBuild({
    where: {
      email: req.body.email
    }
  })
    .spread((user, initialized) => {
      if (!initialized) {
        const error = new Error('User already exists')
        throw (error)
      } else {
        user.password = req.body.password
        return user
      }
    })
    .then(user => {
      return user.save()
    })
    .then(user => {
      req.login(user, err => err ? next(err) : user.sanitize())
    })
    .then(() => {
      res.json(req.user)
    })
    .catch(next)
})

//local login
router.post('/login', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
    }
  })
    .then(user => {
      console.log('req.body', req.body)
      console.log("user", user)
      console.log("correctPassword", user.correctPassword(req.body.password))
      if (!user) {
        res.status(401).send('User not found')
      } else if (!(user.correctPassword(req.body.password))) {
        res.status(401).send('Incorrect password')
      } else {
        req.login(user, err => err ? next(err) : user.sanitize())
      }
    })
    .then(() => res.json(req.user))
    .catch(next)
})

//logout
router.post('/logout', (req, res, next) => {
  req.logout();
  res.sendStatus(200);
});


module.exports = router;