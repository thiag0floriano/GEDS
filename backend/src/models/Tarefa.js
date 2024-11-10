const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Tarefa = sequelize.define('Tarefa', {
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
    defaultValue: 'pendente',
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  chamadoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'tarefas',
  timestamps: true,
});

module.exports = Tarefa;
