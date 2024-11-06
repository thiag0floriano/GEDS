const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Tarefa extends Model {}

Tarefa.init({
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pendente', // Status inicial
  },
  data_vencimento: {
    type: DataTypes.DATE,
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Tarefa',
});

module.exports = Tarefa;