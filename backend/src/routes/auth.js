const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Rota para registro de novo usuário
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verifica se o usuário já existe
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(409).send({ message: 'Usuário já existe' });
    }

    // Cria um novo usuário
    const user = await User.create({ username, password });
    res.status(201).send({ message: 'Usuário registrado com sucesso' });
  } catch (err) {
    console.error('Erro ao registrar usuário:', err);
    res.status(500).send({ message: 'Erro ao registrar usuário' });
  }
});

// Rota para login do usuário
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).send({ message: 'Usuário ou senha inválidos' });
    }

    const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
    console.log('Token gerado:', token);
    res.send({ token });
  } catch (err) {
    console.error('Erro ao fazer login:', err);
    res.status(500).send({ message: 'Erro ao fazer login' });
  }
});

module.exports = router;
