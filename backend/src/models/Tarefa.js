// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/database');

// class Tarefa extends Model {}

// Tarefa.init({
//   titulo: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   descricao: {
//     type: DataTypes.TEXT,
//   },
//   status: {
//     type: DataTypes.STRING,
//     defaultValue: 'pendente', // Status inicial
//   },
//   data_vencimento: {
//     type: DataTypes.DATE,
//   },
//   usuarioId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
// }, {
//   sequelize,
//   modelName: 'Tarefa',
// });

// module.exports = Tarefa;

// models/Tarefa.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Tarefa extends Model {}

Tarefa.init({
  titulo: DataTypes.STRING,
  descricao: DataTypes.STRING,
  status: DataTypes.STRING,
  usuarioId: DataTypes.INTEGER,
  chamadoId: DataTypes.INTEGER, // Relaciona tarefa ao chamado
}, {
  sequelize,
  modelName: 'Tarefa',
});

module.exports = (sequelize, DataTypes) => {
  const Tarefa = sequelize.define('Tarefa', {
    titulo: DataTypes.STRING,
    descricao: DataTypes.STRING,
    status: DataTypes.STRING,
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Users', // Nome da tabela de usuários
        key: 'id'
      }
    }
  });

  Tarefa.associate = function(models) {
    Tarefa.belongsTo(models.User, { foreignKey: 'usuarioId', as: 'usuario' });
  };

  return Tarefa;
};

module.exports = Tarefa;
