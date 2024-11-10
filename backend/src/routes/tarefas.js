const express = require('express');
const Tarefa = require('../models/Tarefa');
const router = express.Router();

// Rota para criar uma tarefa
router.post('/', async (req, res) => {
  try {
    const tarefa = await Tarefa.create(req.body);
    res.status(201).json(tarefa);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar tarefa' });
  }
});

// Rota para listar todas as tarefas
router.get('/', async (req, res) => {
  try {
    const tarefas = await Tarefa.findAll();
    res.json(tarefas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter tarefas' });
  }
});

// Rota para atualizar uma tarefa
router.put('/:id', async (req, res) => {
  try {
    const tarefa = await Tarefa.findByPk(req.params.id);
    if (!tarefa) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    await tarefa.update(req.body);
    res.json(tarefa);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar tarefa' });
  }
});

// Rota para deletar uma tarefa
router.delete('/:id', async (req, res) => {
  try {
    const tarefa = await Tarefa.findByPk(req.params.id);
    if (!tarefa) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    await tarefa.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar tarefa' });
  }
});

// Atribuir usuário a uma tarefa
router.put('/:id/atribuir-usuario', async (req, res) => {
  const { id } = req.params;
  const { usuarioId } = req.body;

  try {
    const tarefa = await Tarefa.findByPk(id);
    if (!tarefa) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    tarefa.usuarioId = usuarioId;
    await tarefa.save();

    res.json(tarefa);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atribuir usuário à tarefa' });
  }
});

module.exports = router;