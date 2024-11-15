const express = require('express');
const Chamado = require('../models/Chamado');
const Tarefa = require('../models/Tarefa');
const HistoricoAtividades = require('../models/HistoricoAtividades');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
  try {
    const chamados = await Chamado.findAll();
    res.send(chamados);
  } catch (error) {
    console.error('Erro ao obter chamados:', error);
    res.status(500).send({ error: 'Erro ao obter chamados' });
  }
});

// Rota para obter um chamado específico pelo ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const chamadoId = req.params.id;
    const chamado = await Chamado.findByPk(chamadoId);

    if (!chamado) {
      return res.status(404).json({ error: 'Chamado não encontrado' });
    }

    console.log("Dados do chamado:", chamado); // Adicionado para depuração
    res.json(chamado);
  } catch (error) {
    console.error('Erro ao obter o chamado:', error);
    res.status(500).json({ error: 'Erro ao obter o chamado' });
  }
});

// Listar tarefas de um chamado específico
router.get('/:chamadoId/tarefas', authenticateToken, async (req, res) => {
  const { chamadoId } = req.params;
  try {
    const tarefas = await Tarefa.findAll({ where: { chamadoId } });
    res.json(tarefas);
  } catch (error) {
    console.error('Erro ao obter tarefas:', error);
    res.status(500).json({ error: 'Erro ao obter tarefas' });
  }
});

// Rota para obter o histórico de atividades de um chamado
router.get('/:id/historico', authenticateToken, async (req, res) => {
  try {
    const atividades = await HistoricoAtividades.findAll({
      where: { chamadoId: req.params.id },
      include: [{ model: User, attributes: ['username'] }],
      order: [['createdAt', 'DESC']],
    });
    res.json(atividades);
  } catch (error) {
    console.error('Erro ao obter histórico de atividades:', error);
    res.status(500).json({ error: 'Erro ao obter histórico de atividades' });
  }
});
// Rota para criar um chamado
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { titulo, descricao, status, data_abertura, data_fechamento, solicitadoPor, categoriaId } = req.body;
    const usuarioId = req.user.userId;

    // Busca o nome do usuário para preencher o campo "abertoPor"
    const usuario = await User.findByPk(usuarioId, { attributes: ['nome'] });
    const abertoPor = usuario ? usuario.nome : 'Desconhecido';

    // Criação do chamado com os novos campos
    const chamado = await Chamado.create({
      titulo,
      descricao,
      status,
      data_abertura: data_abertura || new Date(),
      data_fechamento,
      usuarioId,
      abertoPor,     // Nome do usuário que abriu o chamado
      solicitadoPor, // Nome do solicitante
      protocolo: req.body.protocolo,  // Protocolo recebido do frontend
      categoriaId, 
    });

    // Registrar atividade de criação no histórico
    await HistoricoAtividades.create({
      acao: 'Criação',
      detalhes: `Chamado criado com o título: ${chamado.titulo}`,
      usuarioId,
      chamadoId: chamado.id,
    });

    res.status(201).json(chamado);
  } catch (error) {
    console.error('Erro ao criar chamado:', error);
    res.status(500).json({ error: 'Erro ao criar chamado' });
  }
});
// Criar uma nova tarefa para um chamado específico
router.post('/:chamadoId/tarefas', authenticateToken, async (req, res) => {
  const { chamadoId } = req.params;
  const { titulo, descricao, status, usuarioId } = req.body;
  try {
    const tarefa = await Tarefa.create({ titulo, descricao, status, usuarioId, chamadoId });

    // Registrar atividade de criação de tarefa
    await HistoricoAtividades.create({
      acao: 'Criação de Tarefa',
      detalhes: `Tarefa criada com o título: ${tarefa.titulo}`,
      usuarioId: req.user.userId,
      chamadoId,
    });

    res.status(201).json(tarefa);
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    res.status(500).json({ error: 'Erro ao criar tarefa' });
  }
});

// Rota para atualizar um chamado existente
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const chamadoId = req.params.id;
    const chamado = await Chamado.findByPk(chamadoId);

    if (!chamado) {
      return res.status(404).json({ error: 'Chamado não encontrado' });
    }

    await chamado.update(req.body);

    // Registrar atividade de atualização
    await HistoricoAtividades.create({
      acao: 'Atualização',
      detalhes: `Chamado atualizado com o título: ${chamado.titulo}`,
      usuarioId: req.user.userId,
      chamadoId: chamado.id,
    });

    res.json({ message: 'Chamado atualizado com sucesso', chamado });
  } catch (error) {
    console.error('Erro ao atualizar chamado:', error);
    res.status(500).json({ error: 'Erro ao atualizar chamado' });
  }
});

// Atualizar uma tarefa específica de um chamado
router.put('/tarefas/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, status } = req.body;
  try {
    const tarefa = await Tarefa.findByPk(id);
    if (!tarefa) return res.status(404).json({ error: 'Tarefa não encontrada' });

    await tarefa.update({ titulo, descricao, status });

    // Registrar atividade de atualização de tarefa
    await HistoricoAtividades.create({
      acao: 'Atualização de Tarefa',
      detalhes: `Tarefa atualizada com o título: ${tarefa.titulo}`,
      usuarioId: req.user.userId,
      chamadoId: tarefa.chamadoId,
    });

    res.json(tarefa);
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    res.status(500).json({ error: 'Erro ao atualizar tarefa' });
  }
});

// Excluir uma tarefa específica de um chamado
router.delete('/tarefas/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const tarefa = await Tarefa.findByPk(id);
    if (!tarefa) return res.status(404).json({ error: 'Tarefa não encontrada' });

    await tarefa.destroy();

    // Registrar atividade de exclusão de tarefa
    await HistoricoAtividades.create({
      acao: 'Exclusão de Tarefa',
      detalhes: `Tarefa excluída com o título: ${tarefa.titulo}`,
      usuarioId: req.user.userId,
      chamadoId: tarefa.chamadoId,
    });

    res.json({ message: 'Tarefa excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir tarefa:', error);
    res.status(500).json({ error: 'Erro ao excluir tarefa' });
  }
});

module.exports = router;
