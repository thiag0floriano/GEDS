const User = require('./User');
const Chamado = require('./Chamado');
const HistoricoAtividades = require('./HistoricoAtividades');
const Mensagem = require('./Mensagem');
const Tarefa = require('./Tarefa');
const Categoria = require('./Categoria'); // Novo modelo de Categoria

function setupAssociations() {
  // Associações para o modelo User
  User.hasMany(Chamado, { foreignKey: 'usuarioId' });
  User.hasMany(HistoricoAtividades, { foreignKey: 'usuarioId' });
  User.hasMany(Mensagem, { foreignKey: 'usuarioId' });
  User.hasMany(Tarefa, { foreignKey: 'usuarioId' });

  // Associações para o modelo Chamado
  Chamado.belongsTo(User, { foreignKey: 'usuarioId' });
  Chamado.hasMany(HistoricoAtividades, { foreignKey: 'chamadoId' });
  Chamado.hasMany(Mensagem, { foreignKey: 'chamadoId' });
  Chamado.hasMany(Tarefa, { foreignKey: 'chamadoId' });
  
  // Associação entre Chamado e Categoria com onDelete: 'SET NULL'
  Chamado.belongsTo(Categoria, { foreignKey: 'categoriaId', as: 'categoria', onDelete: 'SET NULL' });
  Categoria.hasMany(Chamado, { foreignKey: 'categoriaId' });

  // Associações para os demais modelos
  HistoricoAtividades.belongsTo(User, { foreignKey: 'usuarioId' });
  HistoricoAtividades.belongsTo(Chamado, { foreignKey: 'chamadoId' });
  Mensagem.belongsTo(User, { foreignKey: 'usuarioId' });
  Mensagem.belongsTo(Chamado, { foreignKey: 'chamadoId' });
  Tarefa.belongsTo(User, { foreignKey: 'usuarioId' });
  Tarefa.belongsTo(Chamado, { foreignKey: 'chamadoId' });
}

module.exports = setupAssociations;
