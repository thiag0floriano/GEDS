<template>
  <div>
    <h1>Tarefas Atribuídas</h1>
    <div v-if="tarefas.length">
      <div v-for="tarefa in tarefas" :key="tarefa.id" class="tarefa-item">
        <h3>{{ tarefa.titulo }}</h3>
        <p>{{ tarefa.descricao }}</p>
        <p>Status: {{ tarefa.status }}</p>
        <button @click="alterarStatus(tarefa.id, 'Concluída')">Marcar como Concluída</button>
        <button @click="excluirTarefa(tarefa.id)">Excluir Tarefa</button>
      </div>
    </div>
    <p v-else>Você não tem tarefas atribuídas.</p>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  name: 'Tarefas',
  data() {
    return {
      tarefas: [],
    };
  },
  methods: {
    async carregarTarefas() {
      try {
        const response = await api.get('/tarefas');
        this.tarefas = response.data;
      } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
        alert('Erro ao carregar tarefas');
      }
    },
    async alterarStatus(tarefaId, novoStatus) {
      try {
        await api.put(`/tarefas/${tarefaId}`, { status: novoStatus });
        alert('Status da tarefa atualizado');
        this.carregarTarefas(); // Atualizar a lista de tarefas
      } catch (error) {
        console.error('Erro ao atualizar status da tarefa:', error);
        alert('Erro ao atualizar status da tarefa');
      }
    },
    async excluirTarefa(tarefaId) {
      try {
        await api.delete(`/tarefas/${tarefaId}`);
        alert('Tarefa excluída com sucesso');
        this.carregarTarefas(); // Atualizar a lista de tarefas
      } catch (error) {
        console.error('Erro ao excluir tarefa:', error);
        alert('Erro ao excluir tarefa');
      }
    }
  },
  async mounted() {
    await this.carregarTarefas();
  }
};
</script>

<style scoped>
  .tarefa-item {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px 0;
  }
</style>
  