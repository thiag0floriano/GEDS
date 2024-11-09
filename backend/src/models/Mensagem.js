// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');
// const User = require('./User');
// const Chamado = require('./Chamado');

// const Mensagem = sequelize.define('Mensagem', {
//   conteudo: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//   },
//   data_envio: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW,
//   },
// });

// Mensagem.belongsTo(User, { foreignKey: 'usuarioId' });
// Mensagem.belongsTo(Chamado, { foreignKey: 'chamadoId' });

// module.exports = Mensagem;

// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');
// const User = require('./User');
// const Chamado = require('./Chamado');

// const Mensagem = sequelize.define(
//   'Mensagem',
//   {
//     conteudo: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//     data_envio: {
//       type: DataTypes.DATE,
//       defaultValue: DataTypes.NOW,
//     },
//   },
//   {
//     tableName: 'mensagems', // Nome da tabela como está no banco de dados
//     timestamps: true,       // Permite createdAt e updatedAt
//     freezeTableName: true,  // Impede o Sequelize de pluralizar o nome da tabela
//   }
// );

// // Definir as associações
// Mensagem.belongsTo(User, { foreignKey: 'usuarioId' });
// Mensagem.belongsTo(Chamado, { foreignKey: 'chamadoId' });

// module.exports = Mensagem;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Chamado = require('./Chamado');

const Mensagem = sequelize.define(
  'Mensagem',
  {
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
      references: {
        model: User,
        key: 'id',
      },
    },
    chamadoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Chamado,
        key: 'id',
      },
    },
  },
  {
    tableName: 'mensagems', // Nome da tabela como está no banco de dados
    timestamps: true,       // Permite createdAt e updatedAt
    freezeTableName: true,  // Impede o Sequelize de pluralizar o nome da tabela
  }
);

// Definir as associações
Mensagem.belongsTo(User, { foreignKey: 'usuarioId' });
Mensagem.belongsTo(Chamado, { foreignKey: 'chamadoId' });

module.exports = Mensagem;
