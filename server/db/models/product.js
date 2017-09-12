const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  asin: {
    type: Sequelize.STRING
  },
  category: {
    // change to enum?
    type: Sequelize.STRING
  }, 
  description: {
    type: Sequelize.TEXT, 
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL
  },
  imUrl: {
    type: Sequelize.TEXT
  },
  inventory: {
    type: Sequelize.INTEGER
  }
}, {
  hooks: {
    // randomly generate quantity given max and min
    beforeCreate: (product, options) => {
      const max = 5;
      const min = 1;
      let quantity = Math.floor(Math.random() * (max - min + 1)) + min;
      product.inventory = quantity;
    }
  }
});

module.exports = Product;