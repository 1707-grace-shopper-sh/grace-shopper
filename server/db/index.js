const db = require('./db');

const User = require('./models/user');
const Product = require('./models/product');
const Order = require('./models/order');
const Review = require('./models/review');
const Related = require('./models/related');

Product.belongsTo(Related);
Order.belongsTo(Product);
Review.belongsTo(Product);

module.exports = db;