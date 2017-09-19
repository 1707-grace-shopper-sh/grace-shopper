'use strict'
const api = require('express').Router()
const db = require('../db')

const Order = db.models.order
const Product = db.models.product

api.route('/')

	.post(function (req, res) {
		Order.findOrCreate(
			{
				where: {
					productId: req.body.id,
					status: "incomplete",
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
				res.status(200).json(data)
			})
			.catch(console.log)
	})

module.exports = api;