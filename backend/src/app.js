const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const chamadoRoutes = require('./routes/chamados');
const authRoutes = require('./routes/auth');
const serverTimeRoutes = require('./routes/serverTime');
const tarefaRoutes = require('./routes/tarefas');
const usuarioRoutes = require('./routes/usuarios');
const mensagensRoutes = require('./routes/mensagens');

// Importa os modelos
require('./models/User');
require('./models/Chamado');
require('./models/HistoricoAtividades');
require('./models/Mensagem');
require('./models/Tarefa');

// Configura as associações
const setupAssociations = require('./models/associations');
setupAssociations();

const app = express();
const PORT = process.env.PORT || 5000;

async function syncModels() {
  try {
    await sequelize.sync({ force: true });
    console.log('Todas as tabelas foram recriadas com sucesso!');
  } catch (error) {
    console.error('Erro ao sincronizar modelos:', error);
  }
}

// syncModels();

app.use(cors({ origin: 'http://localhost:8081' }));
app.use(bodyParser.json());
app.use('/api/chamados', chamadoRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', serverTimeRoutes);
app.use('/api/tarefas', tarefaRoutes);
app.use('/api', usuarioRoutes);
app.use('/api/mensagens', mensagensRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
