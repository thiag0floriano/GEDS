const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Rota para obter todos os usuários com os novos campos
router.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await User.findAll({
      attributes: ['id', 'username', 'nome', 'sobrenome', 'email', 'telefone', 'privilegio'] // Corrige "nivel" para "privilegio"
    });
    res.json(usuarios);
  } catch (err) {
    console.error('Erro ao buscar usuários:', err);
    res.status(500).send({ message: 'Erro ao buscar usuários' });
  }
});

// Rota para registrar um novo usuário
router.post('/usuarios', async (req, res) => {
  const { nome, sobrenome, username, email, telefone, privilegio, password } = req.body; // Corrige "nivel" para "privilegio"
  try {
    const novoUsuario = await User.create({
      nome,
      sobrenome,
      username,
      email,
      telefone,
      privilegio, // Corrige "nivel" para "privilegio"
      password
    });
    res.status(201).json({ message: 'Usuário registrado com sucesso', user: novoUsuario });
  } catch (err) {
    console.error('Erro ao registrar usuário:', err);
    res.status(500).send({ message: 'Erro ao registrar usuário' });
  }
});

module.exports = router;

