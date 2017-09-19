'use strict'
const api = require('express').Router()
const db = require('../db')

const Order = db.models.order
const Product = db.models.product

api.route('/')
	// fetch the cart on page load
	.get(function(req, res) {
		// will eventually filter by user/session
		Order.findAll({
      		include: [{
        		model: Product
		    }]
		})
		.then(entries => res.status(200).json(entries))
	})

	.post(function(req, res) {
		Order.findOrCreate(
			{ where: { productId: req.body.id } }
		)
		.then((res) => {
			const cartEntry = res[0]
			const wasCreated = res[1]
			if (wasCreated || req.body.replaceValue) {
				return Order.update(
					{ quantity: req.body.quantity },
					{ where: { id: cartEntry.id },
						returning: true
					}
				)
			} else {
				return cartEntry.increment(['quantity'], { by: req.body.quantity })
			}
		})
		.then((data) => {
			// update will return an array; if so, use it
			// increment doesn't -- in that case use all the data
			const newEntry = data[1] ? data[1][0] : data
			res.status(200).json(newEntry)
		})
		.catch(console.log)
	})

api.route('/:entryId')
	.delete(function(req, res) {
		Order.destroy(
			{ where: { id: req.params.entryId }
			}
		)
		.then(() => {
			res.status(200).json(req.params.entryId)
		})

	})

module.exports = api;