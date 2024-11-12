<template>
    <div>
      <h1>Relatórios de Desempenho</h1>
  
      <div v-if="dadosChamados">
        <h2>Estatísticas de Chamados</h2>
        <p>Total de Chamados: {{ dadosChamados.totalChamados }}</p>
        <p>Chamados Abertos: {{ dadosChamados.chamadosAbertos }}</p>
        <p>Chamados Fechados: {{ dadosChamados.chamadosFechados }}</p>
        <p>Tempo Médio de Resolução: {{ dadosChamados.tempoMedioResolucao }} horas</p>
      </div>
  
      <div v-if="dadosTarefas">
        <h2>Estatísticas de Tarefas</h2>
        <p>Total de Tarefas: {{ dadosTarefas.totalTarefas }}</p>
        <p>Tarefas Pendentes: {{ dadosTarefas.tarefasPendentes }}</p>
        <p>Tarefas Concluídas: {{ dadosTarefas.tarefasConcluidas }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import api from '../services/api';
  
  export default {
    data() {
      return {
        dadosChamados: null,
        dadosTarefas: null,
      };
    },
    methods: {
      async carregarDadosRelatorios() {
        try {
          // Carregar dados de chamados
          const totalChamadosResponse = await api.get('/relatorios/total-chamados');
          const chamadosPorStatusResponse = await api.get('/relatorios/chamados-por-status');
          const tempoMedioResolucaoResponse = await api.get('/relatorios/tempo-medio-resolucao');
  
          this.dadosChamados = {
            totalChamados: totalChamadosResponse.data.totalChamados,
            chamadosAbertos: chamadosPorStatusResponse.data.find(status => status.status === 'aberto')?.count || 0,
            chamadosFechados: chamadosPorStatusResponse.data.find(status => status.status === 'fechado')?.count || 0,
            tempoMedioResolucao: tempoMedioResolucaoResponse.data.tempoMedioResolucao || 0,
          };
  
          // Carregar dados de tarefas
          const totalTarefasResponse = await api.get('/relatorios/total-tarefas');
          const tarefasPorStatusResponse = await api.get('/relatorios/tarefas-por-status');
  
          this.dadosTarefas = {
            totalTarefas: totalTarefasResponse.data.totalTarefas,
            tarefasPendentes: tarefasPorStatusResponse.data.find(status => status.status === 'pendente')?.count || 0,
            tarefasConcluidas: tarefasPorStatusResponse.data.find(status => status.status === 'concluida')?.count || 0,
          };
        } catch (error) {
          console.error('Erro ao carregar dados de relatórios:', error);
        }
      },
    },
    mounted() {
      this.carregarDadosRelatorios();
    },
  };
  </script>
  
  <style scoped>
  h1 {
    margin-bottom: 20px;
  }
  h2 {
    margin-top: 20px;
  }
  </style>
  