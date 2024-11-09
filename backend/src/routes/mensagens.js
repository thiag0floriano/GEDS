const express = require('express');
const router = express.Router();
const Mensagem = require('../models/Mensagem');
const { User } = require('../models/User');

// Rota para obter todas as mensagens de um chamado específico
router.get('/:chamadoId', async (req, res) => {
  try {
    const mensagens = await Mensagem.findAll({
      where: { chamadoId: req.params.chamadoId },
      include: [{ model: User, attributes: ['username'] }],
      order: [['data_envio', 'ASC']],
    });
    res.json(mensagens);
  } catch (error) {
    console.error('Erro ao buscar mensagens:', error);
    res.status(500).json({ error: 'Erro ao buscar mensagens' });
  }
});

// Rota para enviar uma nova mensagem para um chamado
router.post('/:chamadoId', async (req, res) => {
  const { conteudo } = req.body;
  const { chamadoId } = req.params;
  const usuarioId = req.user.id; // Presume-se que o ID do usuário esteja disponível após autenticação

  try {
    const novaMensagem = await Mensagem.create({
      conteudo,
      chamadoId,
      usuarioId,
    });
    res.status(201).json(novaMensagem);
  } catch (error) {
    console.error('Erro ao criar mensagem:', error);
    res.status(500).json({ error: 'Erro ao criar mensagem' });
  }
});

module.exports = router;
