const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const { Op } = require('sequelize');


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

// Rota para atualizar um usuário
router.put('/:id', async (req, res) => {
  try {
    const usuario = await User.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Atualiza apenas os campos fornecidos
    const { username, email, ...rest } = req.body;

    // Verificar duplicidade de username
    if (username && username !== usuario.username) {
      const existe = await User.findOne({ where: { username } });
      if (existe) {
        return res.status(400).json({ error: 'Este nome de usuário já está em uso.' });
      }
    }

    // Verificar duplicidade de email
    if (email && email !== usuario.email) {
      const existe = await User.findOne({ where: { email } });
      if (existe) {
        return res.status(400).json({ error: 'Este email já está em uso.' });
      }
    }

    await usuario.update({ username, email, ...rest });
    res.json({ message: 'Usuário atualizado com sucesso.' });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ error: 'Erro ao atualizar usuário.' });
  }
});

// Rota para deletar um usuário
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await User.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    await usuario.destroy();
    res.status(204).send(); // No Content
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
});

module.exports = router;

