const express = require('express');
const router = express.Router();
const Mensagem = require('../models/Mensagem');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/authMiddleware');

// Rota para obter todas as mensagens de um chamado específico
router.get('/:chamadoId', authenticateToken, async (req, res) => {
  try {
    const mensagens = await Mensagem.findAll({
      where: { chamadoId: req.params.chamadoId },
      include: [{ model: User, attributes: ['username'] }], // Inclui o User para exibir o nome de usuário
      order: [['data_envio', 'ASC']],
    });
    res.json(mensagens);
  } catch (error) {
    console.error('Erro ao buscar mensagens:', error);
    res.status(500).json({ error: 'Erro ao buscar mensagens' });
  }
});

// Rota para enviar uma nova mensagem para um chamado
router.post('/:chamadoId', authenticateToken, async (req, res) => {
  const { conteudo } = req.body;
  const { chamadoId } = req.params;
  const usuarioId = req.user.id;

  try {
    // Cria a nova mensagem
    const novaMensagem = await Mensagem.create({
      conteudo,
      chamadoId,
      usuarioId,
    });

    // Busca a mensagem criada com o User incluído para retornar com o username
    const mensagemComUsuario = await Mensagem.findOne({
      where: { id: novaMensagem.id },
      include: [{ model: User, attributes: ['username'] }],
    });

    res.status(201).json(mensagemComUsuario);
  } catch (error) {
    console.error('Erro ao criar mensagem:', error);
    res.status(500).json({ error: 'Erro ao criar mensagem' });
  }
});

module.exports = router;
