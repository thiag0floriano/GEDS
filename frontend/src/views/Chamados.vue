<template>
  <div>
    <h1>Criar Chamado</h1>
    <form @submit.prevent="createChamado">
      <div>
        <label for="title">Título:</label>
        <input type="text" id="title" v-model="title" required>
      </div>
      <div>
        <label for="description">Descrição:</label>
        <textarea id="description" v-model="description" required></textarea>
      </div>
      <button type="submit">Criar Chamado</button>
    </form>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  name: 'ChamadosPage',
  data() {
    return {
      title: '',
      description: '',
    };
  },
  methods: {
    async createChamado() {
      try {
        const newChamado = {
          title: this.title,
          description: this.description,
        };
        await api.post('/chamados', newChamado);
        this.title = '';
        this.description = '';
        alert('Chamado criado com sucesso!');
      } catch (error) {
        console.error('Error creating chamado:', error);
        alert('Erro ao criar chamado.');
      }
    },
  },
};
</script>
