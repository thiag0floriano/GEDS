const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Chamado = sequelize.define('Chamado', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Aberto',
  },
  data_abertura: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  data_fechamento: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  abertoPor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  solicitadoPor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  protocolo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'chamados',
  timestamps: true,
});

// Gera o protocolo automaticamente antes de criar o chamado
Chamado.beforeCreate(async (chamado) => {
  chamado.protocolo = Math.random().toString(36).substring(2, 7).toUpperCase();
});

module.exports = Chamado;
