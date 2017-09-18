'use strict'
const api = require('express').Router()
const db = require('../db')

const Order = db.models.order
const Product = db.models.product

api.route('/')
	// fetch the cart on page load
	// .get(function (req, res) {
	// 	// will eventually filter by user/session
	// 	Order.findAll({
	// 		include: [{
	// 			model: Product
	// 		}]
	// 	})
	// 		.then(entries => res.status(200).json(entries))
	// })

	.post(function (req, res) {
		// need to add the session id here
		Order.findOrCreate(
			{
				where: {
					productId: req.body.id,
					$or : [
						{
							user: req.body.userId
						}, {
							session: req.session.id
						}
					]
				}
			}
		)
			.then((res) => {
				const cartEntry = res[0]
				const wasCreated = res[1]

				if (wasCreated) {
					return Order.update(
						{ quantity: req.body.quantity,
						  session: req.session.id,
						  user: req.body.userId  },
						{
							where: { id: cartEntry.id },
							returning: true
						}
					)
				} else {
					return cartEntry.increment(['quantity'], { by: req.body.quantity })
				}
			})
			.then((data) => {
				const newEntry = data[1]
				res.status(200).json(newEntry)
			})
			.catch(console.log)
	})

module.exports = api;