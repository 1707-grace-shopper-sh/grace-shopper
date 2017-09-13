const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
	// orders must belong to a user or a guess session (auth vs. unauth)
	user: {
		type: Sequelize.STRING
	},
	products: {
		// an array of objects?
		// needs to contain product name, id, price, and quantity, maybe others?
		type: Sequelize.ARRAY(Sequelize.JSON)
	},
	total: {
		type: Sequelize.DECIMAL
	},
	complete: {
		//KM: enum thing again
		// error when using enums
		type: Sequelize.STRING
	},
	shipped: {
		// error when using enums
		type: Sequelize.STRING
	}
});

module.exports = Order;
