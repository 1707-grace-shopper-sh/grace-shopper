'use strict'
const api = require('express').Router()
const db = require('../db')

const Review = db.models.review;

api.route('/')    
    //get all reviews by product
    // // // *** // // 

    //post new review
    .post(function(req,res){
        Review.create(req.body)
        .then(review => res.status(200).json(review))
    })

module.exports = api;