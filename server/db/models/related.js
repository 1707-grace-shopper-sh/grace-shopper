const Sequelize = require('sequelize')
const db = require('../db');

const Related = db.define('related', {
  also_bought: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  },
  also_viewed: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  }
});

module.exports = Related;