'use strict'
const router = require('express').Router();
const db = require('../../db')
const User = db.models.user;


//Google Login
router.use('/google', require('./google'))

router.get('/me', (req, res, next) => { // SH - will fetch cart data also 
  res.json(req.user);
})


//Local sign up
router.post('/create', (req, res, next) => { // OB - post to '/me' (I'm making the user)
  User.findOrBuild({ // OB - this could also be a class method!
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
      req.login(user, err => err ? next(err) : user.sanitize()) // OB - login is asynch, there might be a race condition... Promisify your passport methods! You could also put the res.json into a cb
    })
    .then(()=>{
      res.json(req.user)
    })
    .catch(next) // OB - Front end error handling TOASTR! SH - look into redux error handling middleware too!
})

//local login
router.post('/login', (req, res, next) => { // OB - put to '/me' (I'm updating the user)
  User.findOne({
    where: {
      email: req.body.email,
    }
  })
    .then(user => { // SH - these are gone but just adding a note here about console logs
      console.log('req.body', req.body)
      console.log("user", user)
      console.log("correctPassword", user.correctPassword(req.body.password))
      if (!user) {
        res.status(401).send('User not found') // SH - more front end error handling could be done here
      } else if (!(user.correctPassword(req.body.password))) {
        res.status(401).send('Incorrect password')
      } else {
        req.login(user, err => err ? next(err) : user.sanitize()) // SH - promisify login, and then off before res.jsoning (look up promisify in bluebird)
      }
    })
    .then(()=>res.json(req.user))
    .catch(next)
})

//logout
router.post('/logout', (req, res, next) => { // SH - delete to '/me' (I'm deleting the user) OB - try not to write verbs in your routes
  req.logout();
  res.sendStatus(200); // OB - you could send 204 no content
});


module.exports = router;