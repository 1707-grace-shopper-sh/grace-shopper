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
			if (wasCreated || req.body.replaceValue) {
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
		.then(() => {
			return Order.findOne(
				{ where: { productId: req.body.id} }
			)
		})
		.then((data) => {
			// update will return an array; if so, use it
			// increment doesn't -- in that case use all the data
			// const newEntry = data[1] ? data[1][0] : data

			res.status(200).json(data)
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