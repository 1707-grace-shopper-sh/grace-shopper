const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
	// orders must belong to a user or a guess session (auth vs. unauth)
	session: {
		type: Sequelize.STRING
	},
	quantity: {
		type: Sequelize.INTEGER
	}, 
	date: {
		type: Sequelize.DATE,
		allowNull: true
	}
});

module.exports = Order;