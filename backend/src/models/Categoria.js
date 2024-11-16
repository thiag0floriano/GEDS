const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Categoria = sequelize.define('Categoria', {
  nome: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'categoria',
  timestamps: false,
});

module.exports = Categoria;
