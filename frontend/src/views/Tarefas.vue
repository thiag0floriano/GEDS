<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center">
        <h1>Tarefas Atribuídas</h1>
      </v-col>
    </v-row>

    <v-row v-if="tarefas.length">
      <v-col v-for="tarefa in tarefas" :key="tarefa.id" cols="12" md="6" lg="4">
        <v-card outlined class="mb-4">
          <v-card-title>{{ tarefa.titulo }}</v-card-title>
          <v-card-subtitle>Status: {{ tarefa.status }}</v-card-subtitle>
          <v-card-text>{{ tarefa.descricao }}</v-card-text>

          <v-card-actions>
            <v-btn color="success" @click="alterarStatus(tarefa.id, 'Concluída')" text>
              Marcar como Concluída
            </v-btn>
            <v-btn color="error" @click="excluirTarefa(tarefa.id)" text>
              Excluir Tarefa
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col cols="12" class="text-center">
        <p>Você não tem tarefas atribuídas.</p>
      </v-col>
    </v-row>
  </v-container>
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
    },
  },
  async mounted() {
    await this.carregarTarefas();
  },
};
</script>

<style scoped>
.v-card {
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
