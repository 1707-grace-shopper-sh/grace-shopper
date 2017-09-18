const Sequelize = require('sequelize')
const db = require('../db');

const Related = db.define('related', { // SH - will probably end up deleting
  also_bought: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  },
  also_viewed: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  }
});

module.exports = Related;