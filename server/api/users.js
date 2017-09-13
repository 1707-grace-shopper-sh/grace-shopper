'use strict'

const api = require('express').Router()
const db = require('../db')

const User = db.models.user;

api.route('/')
.post((req, res, next)=>{
  console.log(req.body)  
  User.findOrBuild({where: {
      email: req.body.email
    }})
    .spread((user, initialized)=>{
      if(initialized) {
        user.password= req.body.password
       } else {
        console.log('in else')
        throw new Error("It seems that there is already an account with this email")  //come back to this
      }
      return user
    })
    .then(user=>{
      user.save()
      return user
    })
    .then(user=>{
      res.json(user)
    }) 
    .catch(next)
  })

module.exports = api