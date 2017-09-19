const Sequelize = require('sequelize');
const db = require('../db');
const Product = db.models.product

const Order = db.define('order', {
	// orders must belong to a user or a guess session (auth vs. unauth)
	user: {
		type: Sequelize.STRING
	},
	quantity: {
		type: Sequelize.INTEGER
	}, 
	status: {
		type: Sequelize.STRING
	}
}, {
	defaultScope: {
		include: [
			{ model: Product }
		]
  	}		  	
});

module.exports = Order;