'use strict'
const api = require('express').Router()
const db = require('../db')

const Review = db.models.review;
const Product = db.models.product;

api.route('/categories')
	// fetch all categories to populate navbar etc. 
	.get(function(req, res) {
		const categories = Product.rawAttributes.category.values
		res.status(200).json(categories)
});

api.route('/') // SH - handle your errors!
	// load all data
	.get(function(req, res) {
		Product.findAll()
		.then(products => res.status(200).json(products)) // SH - handle your errors
	})
	// post new product to database
	.post(function(req,res){
		Product.create(req.body)
		.then(product => res.status(200).json(product)) // SH - handle your errors
	});

api.route('/:id')
	//get a single product
	.get(function(req, res) {
		Product.findOne({
			where: {
				id: req.params.id
			}
		})
		.then(product => res.status(200).json(product)); // SH - handle your errors
	})
	.put(function(req, res) {
		Product.update(req.body, {
			where: {
				id: req.params.id
			}
		})
		.then(() => { // SH - you don't need to find it if returns true
            return Product.findOne({
                where: {
                    id: req.params.id
                }
            })
		})
		.then(product => res.status(200).json(product)) // SH - handle your errors
	})

module.exports = api;