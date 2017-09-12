const db = require('./db');

const User = require('./models/user');
const Product = require('./models/product');
const Order = require('./models/order');
const Review = require('./models/review');
const Related = require('./models/related');

// add associations here
Product.belongsTo(Related);
// Order.belongsTo(User);

module.exports = db;