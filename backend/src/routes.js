const express = require('express');
const router = express.Router();
const db = require('./db');

// Rota para obter todos os chamados
router.get('/chamados', (req, res) => {
  db.query('SELECT * FROM chamados', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Rota para criar um novo chamado
router.post('/chamados', (req, res) => {
  const { title, description } = req.body;
  db.query('INSERT INTO chamados (title, description) VALUES (?, ?)', [title, description], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).json({ id: results.insertId, title, description });
  });
});

module.exports = router;
