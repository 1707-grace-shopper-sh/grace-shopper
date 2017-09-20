const Sequelize = require('sequelize');
const db = require('../db');
const Product = db.models.product

const Order = db.define('order', {
	session: {
		type: Sequelize.STRING
	},
	user: {
		type: Sequelize.INTEGER
	},
	quantity: {
		type: Sequelize.INTEGER
	},
	status: {
		type: Sequelize.STRING,
		defaultValue: "Incomplete"
	}
}, {
		defaultScope: {
			include: [
				{ model: Product }
			]
		}
	});

module.exports = Order;