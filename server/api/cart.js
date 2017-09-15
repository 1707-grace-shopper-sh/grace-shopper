'use strict'
const api = require('express').Router()
const db = require('../db')

const Order = db.models.order

api.route('/')
	// will eventually fetch the cart on page load
	.get(function(req, res) {

	})

	.post(function(req, res) {
		console.log('trying to add to the database!')
		console.log('the req.body is')
		console.log(req.body)
	})

module.exports = api;