const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('geds_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
