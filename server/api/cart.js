'use strict'
const api = require('express').Router()
const db = require('../db')

const Order = db.models.order

api.route('/')
	// will eventually fetch the cart on page load
	.get(function(req, res) {

	})

	.post(function(req, res) {
		// need to add the session id here
		console.log('in the post request')
		// console.log('req.session.id')
		// console.log(req.session.id)
		console.log(req.body)
		Order.findOrCreate(
			{ where: { productId: req.body.id } }
		)
		.then((res) => {
			const cartEntry = res[0]
			return Order.update(
				{ quantity: req.body.quantity },
				{ where: { id: cartEntry.id },
					returning: true
				}
			)
		})
		.then((data) => {
			const newEntry = data[1]
			res.status(200).json(newEntry)
		})
		.catch(console.log)
	})

module.exports = api;