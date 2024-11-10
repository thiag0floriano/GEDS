const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Chamado = sequelize.define('Chamado', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  data_abertura: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  data_fechamento: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'chamados' // Define o nome da tabela como 'chamados'
});

module.exports = Chamado;
