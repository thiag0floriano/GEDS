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
    console.log('Token received:', token); // Linha corrigida para depuração
    const decoded = jwt.verify(token, 'your_jwt_secret'); // Certifique-se de usar o mesmo segredo
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Token verification failed:', err); // Linha para depuração
    res.status(401).send({ message: 'Invalid token' });
  }
};

router.get('/', authenticate, async (req, res) => {
  try {
    const chamados = await Chamado.findAll();
    res.send(chamados);
  } catch (error) {
    console.error('Erro ao obter chamados:', error);
    res.status(500).send({ error: 'Erro ao obter chamados' });
  }
});

router.post('/', authenticate, async (req, res) => {
  try {
    const chamado = await Chamado.create(req.body);
    res.status(201).send(chamado);
  } catch (error) {
    console.error('Erro ao criar chamado:', error);
    res.status(500).send({ error: 'Erro ao criar chamado' });
  }
});

module.exports = router;
