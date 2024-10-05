const express = require('express');
const jwt = require('jsonwebtoken');
const Chamado = require('../models/Chamado');

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
    const { title, description, status, dataAbertura, usuarioId } = req.body;

    const chamado = await Chamado.findByPk(chamadoId);
    if (!chamado) {
      return res.status(404).json({ error: 'Chamado não encontrado' });
    }

    // Atualiza os campos do chamado
    await chamado.update({
      title,
      description,
      status,
      dataAbertura,
      usuarioId
    });

    res.json({ message: 'Chamado atualizado com sucesso', chamado });
  } catch (error) {
    console.error('Erro ao atualizar chamado:', error);
    res.status(500).json({ error: 'Erro ao atualizar chamado' });
  }
});

module.exports = router;
