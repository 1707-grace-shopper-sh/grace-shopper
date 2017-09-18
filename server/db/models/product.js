const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  asin: {
    type: Sequelize.STRING
  },
  category: {
    type: Sequelize.ENUM,
    values: ['Candy', 'Condiments and Seasonings', 'Tea and Beverages', 'Seafood']
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
    // randomly generate inventory given max and min
    beforeCreate: (product, options) => {
      const max = 10;
      const min = 1;
      let quantity = Math.floor(Math.random() * (max - min + 1)) + min;
      product.inventory = quantity;
    }
  }
});

module.exports = Product;