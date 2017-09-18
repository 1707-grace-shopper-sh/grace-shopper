'use strict'
const api = require('express').Router()
const db = require('../db')

const Review = db.models.review;

api.route('/')    
    //post new review
    .post(function(req,res) {
        Review.create(req.body)
        .then(review => res.status(200).json(review)) // SH - handle your errors
    })


api.route('/by-product/:id') // OB - api/reviews?productId=5 or /api/products/:productId/reviews  (omri prefers query strings)
    //get by product id
    .get(function(req,res) {
        Review.findAll({ // SH - find by id?
            where: {
                productId: req.params.id
            }
        })
        .then(reviews => res.status(200).json(reviews)) // SH - handle your errors
    })

module.exports = api;