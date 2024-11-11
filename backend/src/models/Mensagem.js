const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Mensagem = sequelize.define('Mensagem', {
  conteudo: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  data_envio: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  chamadoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'mensagems',
  timestamps: true,
  freezeTableName: true,
});

module.exports = Mensagem;
