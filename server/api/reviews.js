'use strict'
const api = require('express').Router()
const db = require('../db')

const Review = db.models.review;

api.route('/')    
    //post new review
    .post(function(req,res){
        Review.create(req.body)
        .then(review => res.status(200).json(review))
    })


api.route('/by-product/:id')
    //get by product id
    .get(function(req,res){
        Review.findAll({
            where: {
                productId: req.params.id
            }
        })
        .then(reviews => res.status(200).json(reviews))
    })

module.exports = api;