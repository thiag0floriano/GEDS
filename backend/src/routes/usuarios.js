const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await User.findAll({ attributes: ['id', 'username'] }); // Seleciona somente id e username
    res.json(usuarios);
  } catch (err) {
    console.error('Erro ao buscar usuários:', err);
    res.status(500).send({ message: 'Erro ao buscar usuários' });
  }
});

module.exports = router;
