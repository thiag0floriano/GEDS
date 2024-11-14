const { Sequelize } = require('sequelize');
const moment = require('moment-timezone');

const sequelize = new Sequelize('geds_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  timezone: '-03:00',
  dialectOptions: {
    dateStrings: true,
    typeCast: function (field, next) {
      // Verifica se o campo é do tipo DATETIME
      if (field.type === 'DATETIME') {
        // Converte a string da data para o fuso horário correto
        return moment.tz(field.string(), 'America/Sao_Paulo').toDate();
      }
      return next();
    },
  },
});

module.exports = sequelize;
