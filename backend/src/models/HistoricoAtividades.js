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
    get() {
      const rawValue = this.getDataValue('createdAt');
      return rawValue ? new Date(rawValue.getTime() + 3 * 60 * 60 * 1000) : null;
    },
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    get() {
      const rawValue = this.getDataValue('updatedAt');
      return rawValue ? new Date(rawValue.getTime() + 3 * 60 * 60 * 1000) : null;
    },
  },
}, {
  tableName: 'historico_atividades',
  timestamps: true,
});

module.exports = HistoricoAtividades;
