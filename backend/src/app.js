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

const app = express();
const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  console.log('Banco de dados conectado e modelos sincronizados');
});

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
