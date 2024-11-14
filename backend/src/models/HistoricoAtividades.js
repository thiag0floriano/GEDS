const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database');

const HistoricoAtividades = sequelize.define('HistoricoAtividades', {
  acao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  detalhes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  chamadoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
}, {
  tableName: 'historico_atividades',
  timestamps: true,
});

module.exports = HistoricoAtividades;
