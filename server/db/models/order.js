const Sequelize = require('sequelize');
const db = require('../db');

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
		type: Sequelize.STRING
	}
});

module.exports = Order;