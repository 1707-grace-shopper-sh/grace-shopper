'use strict'
const api = require('express').Router()
const db = require('../db')

const Review = db.models.review;
const Product = db.models.product;

api.route('/')
	// load all data
	.get(function(req, res) {
		Product.findAll()
		.then(products => res.status(200).json(products));
	})
	// post new product to database
	.post(function(req,res){
		Product.create(req.body)
		.then(product => res.status(200).json(product))
	});

api.route('/:id')
	//get a single product
	.get(function(req, res) {
		Product.findOne({
			where: {
				id: req.params.id
			}
		})
		.then(product => res.status(200).json(product));
	})
	.put(function(req, res) {
		Product.update(req.body, {
			where: {
				id: req.params.id
			}
		})
		.then(() => {
            return Product.findOne({
                where: {
                    id: req.params.id
                }
            })
		})
		.then(product => res.status(200).json(product))
	})


// api.route('/reviews')
// 	// load all data
// 	.get(function(req, res) {
// 		Review.findAll()
// 		.then(reviews => res.status(200).json(reviews));
// 	});

// api.route('/reviews/positive')
// 	// load all data
// 	.get(function(req, res) {
// 		Review.nMostPositive('616719923X')
// 		.then(reviews => res.status(200).json(reviews));
// 	});

// api.route('/reviews/negative')
// 	// load all data
// 	.get(function(req, res) {
// 		Review.nMostNegative('616719923X')
// 		.then(reviews => res.status(200).json(reviews));
// 	});

// api.route('/reviews/recent')
// 	// load all data
// 	.get(function(req, res) {
// 		Review.nMostRecent('616719923X')
// 		.then(reviews => res.status(200).json(reviews));
// 	});

module.exports = api;