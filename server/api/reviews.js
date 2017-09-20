'use strict'
const api = require('express').Router()
const db = require('../db')

const Review = db.models.review
const Product = db.models.product

api.route('/')    
    //post new review
    .post(function(req,res) {
        Review.create(req.body)
        .then(review => res.status(200).json(review))
    })


api.route('/by-product/:id')
    //get by product id
    .get(function(req,res) {
        Product.findOne({
            where: {id: req.params.id}
        })
        .then(product => {
            return Review.findAll({
                where: {
                   $or: [
                    { productId: product.id },
                    { asin: product.asin }
                   ],
                },
                order: [['createdAt', 'DESC']]
            })
        })
        .then(reviews => {
            res.status(200).json(reviews)
        })
    })

module.exports = api;