const Sequelize = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/graceshopper', {
  logging: false // unless you like the logs
  // ...and there are many other options 
});

module.exports = db;