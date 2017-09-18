const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
	// orders must belong to a user or a guess session (auth vs. unauth)
	user: { // OB - could this be an association instead of a field? It might be more straight forward?
		type: Sequelize.STRING
	},
	quantity: {
		type: Sequelize.INTEGER
	}, 
	status: { // SH - should eventually be an ENUM
		type: Sequelize.STRING
	}
});

module.exports = Order;