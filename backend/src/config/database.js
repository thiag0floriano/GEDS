const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('geds_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  timezone: '-03:00',
  dialectOptions: {
    dateStrings: true,
    typeCast: function (field, next) {
      if (field.type === 'DATETIME') {
        return new Date(field.string() + ' UTC');
      }
      return next();
    },
  },
});

module.exports = sequelize;
