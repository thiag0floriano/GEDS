const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Middleware para processar JSON
app.use(express.json());

// Configuração do banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Adicione sua senha aqui
    database: 'gestao_chamados'
});

// Conectar ao banco de dados
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conectado ao banco de dados MySQL');
});

// Rota para testar a conexão
app.get('/', (req, res) => {
    res.send('Servidor funcionando!');
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

//-------------------------------------------------------------------
// Rota para criar um novo chamado
app.post('/chamados', (req, res) => {
    const { titulo, descricao, status, data_abertura, usuario_id } = req.body;
    const query = 'INSERT INTO chamados (titulo, descricao, status, data_abertura, usuario_id) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [titulo, descricao, status, data_abertura, usuario_id], (err, result) => {
        if (err) throw err;
        res.send('Chamado criado com sucesso!');
    });
});

// Rota para obter todos os chamados
app.get('/chamados', (req, res) => {
    const query = 'SELECT * FROM chamados';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Rota para obter um chamado por ID
app.get('/chamados/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM chamados WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Rota para atualizar um chamado
app.put('/chamados/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, status, data_fechamento } = req.body;
    const query = 'UPDATE chamados SET titulo = ?, descricao = ?, status = ?, data_fechamento = ? WHERE id = ?';
    db.query(query, [titulo, descricao, status, data_fechamento, id], (err, result) => {
        if (err) throw err;
        res.send('Chamado atualizado com sucesso!');
    });
});

// Rota para deletar um chamado
app.delete('/chamados/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM chamados WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) throw err;
        res.send('Chamado deletado com sucesso!');
    });
});
