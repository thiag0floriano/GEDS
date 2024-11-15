const express = require('express');
const Categoria = require('../models/Categoria');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    console.log("Categorias carregadas:", categorias);
    res.json(categorias);
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    res.status(500).json({ error: 'Erro ao buscar categorias' });
  }
});

module.exports = router;
