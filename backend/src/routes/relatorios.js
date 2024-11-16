const express = require('express');
const Chamado = require('../models/Chamado');
const Tarefa = require('../models/Tarefa');
const User = require('../models/User'); // Modelo de usuário para obter nomes
const { Op } = require('sequelize');
const sequelize = require('../config/database');
const Sequelize = require('sequelize');

const router = express.Router();

// Total de chamados
router.get('/total-chamados', async (req, res) => {
  try {
    const totalChamados = await Chamado.count();
    res.json({ totalChamados });
  } catch (error) {
    console.error('Erro ao obter total de chamados:', error);
    res.status(500).json({ error: 'Erro ao obter total de chamados' });
  }
});

// Chamados por status
// router.get('/chamados-por-status', async (req, res) => {
//   try {
//     const chamadosPorStatus = await Chamado.findAll({
//       attributes: ['status', [Sequelize.fn('COUNT', 'status'), 'count']],
//       group: 'status',
//     });
//     res.json(chamadosPorStatus);
//   } catch (error) {
//     console.error('Erro ao obter chamados por status:', error);
//     res.status(500).json({ error: 'Erro ao obter chamados por status' });
//   }
// });
router.get('/chamados-por-status', async (req, res) => {
  try {
    const chamadosPorStatus = await Chamado.findAll({
      attributes: ['status', [Sequelize.fn('COUNT', Sequelize.col('status')), 'count']],
      group: ['status'], // Certifique-se de agrupar corretamente
      raw: true // Retorna os dados diretamente como objetos simples
    });

    console.log('Chamados por Status:', chamadosPorStatus); // Log para verificar os dados
    res.json(chamadosPorStatus);
  } catch (error) {
    console.error('Erro ao obter chamados por status:', error);
    res.status(500).json({ error: 'Erro ao obter chamados por status' });
  }
});


// Chamados por período
router.get('/chamados-por-periodo', async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    const chamadosPorPeriodo = await Chamado.count({
      where: {
        createdAt: {
          [Op.between]: [new Date(startDate), new Date(endDate)],
        },
      },
    });
    res.json({ chamadosPorPeriodo });
  } catch (error) {
    console.error('Erro ao obter chamados por período:', error);
    res.status(500).json({ error: 'Erro ao obter chamados por período' });
  }
});

// Tempo médio de resolução
router.get('/tempo-medio-resolucao', async (req, res) => {
  try {
    const [result] = await sequelize.query(`
      SELECT AVG(TIMESTAMPDIFF(HOUR, data_abertura, data_fechamento)) AS averageResolutionTime
      FROM chamados
      WHERE data_fechamento IS NOT NULL
    `);
    const tempoMedioResolucao = result[0].averageResolutionTime;
    res.json({ tempoMedioResolucao });
  } catch (error) {
    console.error('Erro ao calcular tempo médio de resolução:', error);
    res.status(500).json({ error: 'Erro ao calcular tempo médio de resolução' });
  }
});

// Total de tarefas
router.get('/total-tarefas', async (req, res) => {
  try {
    const totalTarefas = await Tarefa.count();
    res.json({ totalTarefas });
  } catch (error) {
    console.error('Erro ao obter total de tarefas:', error);
    res.status(500).json({ error: 'Erro ao obter total de tarefas' });
  }
});

// Tarefas por status
router.get('/tarefas-por-status', async (req, res) => {
  try {
    const tarefasPorStatus = await Tarefa.findAll({
      attributes: ['status', [Sequelize.fn('COUNT', 'status'), 'count']],
      group: 'status',
    });
    res.json(tarefasPorStatus);
  } catch (error) {
    console.error('Erro ao obter tarefas por status:', error);
    res.status(500).json({ error: 'Erro ao obter tarefas por status' });
  }
});

// Tarefas por usuário
router.get('/tarefas-por-usuario', async (req, res) => {
  try {
    const tarefasPorUsuario = await Tarefa.findAll({
      attributes: [
        [Sequelize.col('User.nome'), 'usuario'], // Ajuste conforme o campo no modelo User
        [Sequelize.fn('COUNT', Sequelize.col('Tarefa.id')), 'totalTarefas'],
      ],
      include: [{ model: User, attributes: [] }], // Inclui o modelo User para obter os nomes
      group: ['User.nome'], // Agrupa pelo nome do usuário
    });

    res.json(tarefasPorUsuario);
  } catch (error) {
    console.error('Erro ao obter tarefas por usuário:', error);
    res.status(500).json({ error: 'Erro ao obter tarefas por usuário' });
  }
});

module.exports = router;
