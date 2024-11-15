const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');

// Rota para obter os dados do usuário logado
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId; // Recupera o ID do usuário logado do token JWT
    const user = await User.findByPk(userId, { attributes: ['id', 'username', 'nome'] });
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json(user);
  } catch (error) {
    console.error('Erro ao obter usuário logado:', error);
    res.status(500).json({ error: 'Erro ao obter usuário logado' });
  }
});

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

