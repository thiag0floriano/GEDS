const express = require('express');
const jwt = require('jsonwebtoken');
const Chamado = require('../models/Chamado');
const Tarefa = require('../models/Tarefa');

const router = express.Router();

const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).send({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).send({ message: 'Token is missing' });

  try {
    console.log('Token received:', token); // Linha depuração
    const decoded = jwt.verify(token, 'your_jwt_secret'); // usar o mesmo segredo
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Token verification failed:', err); // Linha depuração
    res.status(401).send({ message: 'Invalid token' });
  }
};

// Rota para obter chamados
router.get('/', authenticate, async (req, res) => {
  try {
    const chamados = await Chamado.findAll();
    res.send(chamados);
  } catch (error) {
    console.error('Erro ao obter chamados:', error);
    res.status(500).send({ error: 'Erro ao obter chamados' });
  }
});

// Rota para obter um chamado específico pelo ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const chamadoId = req.params.id;
    const chamado = await Chamado.findByPk(chamadoId);

    if (!chamado) {
      return res.status(404).json({ error: 'Chamado não encontrado' });
    }

    res.json(chamado);
  } catch (error) {
    console.error('Erro ao obter o chamado:', error);
    res.status(500).json({ error: 'Erro ao obter o chamado' });
  }
});

// Rota para criar um chamado
router.post('/', authenticate, async (req, res) => {
  try {
    const chamado = await Chamado.create(req.body);
    res.status(201).send(chamado);
  } catch (error) {
    console.error('Erro ao criar chamado:', error);
    res.status(500).send({ error: 'Erro ao criar chamado' });
  }
});

// Rota para atualizar um chamado existente
router.put('/:id', async (req, res) => {
  try {
    const chamadoId = req.params.id;
    const { titulo, descricao, status, data_abertura, data_fechamento, usuarioId } = req.body;

    const chamado = await Chamado.findByPk(chamadoId);
    if (!chamado) {
      return res.status(404).json({ error: 'Chamado não encontrado' });
    }

    // Atualiza os campos do chamado
    await chamado.update({
      titulo,
      descricao,
      status,
      data_abertura,
      data_fechamento,
      usuarioId
    });

    res.json({ message: 'Chamado atualizado com sucesso', chamado });
  } catch (error) {
    console.error('Erro ao atualizar chamado:', error);
    res.status(500).json({ error: 'Erro ao atualizar chamado' });
  }
});

// Listar tarefas de um chamado específico
router.get('/:chamadoId/tarefas', authenticate, async (req, res) => {
  const { chamadoId } = req.params;
  try {
    const tarefas = await Tarefa.findAll({ where: { chamadoId } });
    res.json(tarefas);
  } catch (error) {
    console.error('Erro ao obter tarefas:', error);
    res.status(500).json({ error: 'Erro ao obter tarefas' });
  }
});

// Criar uma nova tarefa para um chamado específico
router.post('/:chamadoId/tarefas', authenticate, async (req, res) => {
  const { chamadoId } = req.params;
  const { titulo, descricao, status, usuarioId } = req.body;
  try {
    const tarefa = await Tarefa.create({ titulo, descricao, status, usuarioId, chamadoId });
    res.status(201).json(tarefa);
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    res.status(500).json({ error: 'Erro ao criar tarefa' });
  }
});

// Atualizar uma tarefa específica de um chamado
router.put('/tarefas/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, status } = req.body;
  try {
    const tarefa = await Tarefa.findByPk(id);
    if (!tarefa) return res.status(404).json({ error: 'Tarefa não encontrada' });

    await tarefa.update({ titulo, descricao, status });
    res.json(tarefa);
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    res.status(500).json({ error: 'Erro ao atualizar tarefa' });
  }
});

// Excluir uma tarefa específica de um chamado
router.delete('/tarefas/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    const tarefa = await Tarefa.findByPk(id);
    if (!tarefa) return res.status(404).json({ error: 'Tarefa não encontrada' });

    await tarefa.destroy();
    res.json({ message: 'Tarefa excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir tarefa:', error);
    res.status(500).json({ error: 'Erro ao excluir tarefa' });
  }
});

module.exports = router;
