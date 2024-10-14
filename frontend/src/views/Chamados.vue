<!-- <template>
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
      <div>
        <label for="status">Status:</label>
        <input type="text" id="status" v-model="status" required>
      </div>
      <div>
        <label for="dataAbertura">Data de Abertura:</label>
        <input type="datetime-local" id="dataAbertura" v-model="dataAbertura" required>
      </div>
      <div>
        <label for="usuarioId">ID do Usuário:</label>
        <input type="number" id="usuarioId" v-model="usuarioId" required>
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
      status: '',
      dataAbertura: '',
      usuarioId: ''
    };
  },
  methods: {
    async createChamado() {
      try {
        const newChamado = {
          title: this.title,
          description: this.description,
          status: this.status,
          dataAbertura: new Date(this.dataAbertura).toISOString(),
          usuarioId: this.usuarioId
        };
        await api.post('/chamados', newChamado);
        this.title = '';
        this.description = '';
        this.status = '';
        this.dataAbertura = '';
        this.usuarioId = '';
        alert('Chamado criado com sucesso!');
      } catch (error) {
        console.error('Error creating chamado:', error);
        alert('Erro ao criar chamado.');
      }
    },
  },
};
</script> -->

<template>
  <div>
    <h1>Atualizar Chamado</h1>
    <form @submit.prevent="updateChamado">
      <div>
        <label for="id">ID do Chamado:</label>
        <input type="number" id="id" v-model="id" required>
      </div>
      <div>
        <label for="title">Título:</label>
        <input type="text" id="title" v-model="title" required>
      </div>
      <div>
        <label for="description">Descrição:</label>
        <textarea id="description" v-model="description" required></textarea>
      </div>
      <div>
        <label for="status">Status:</label>
        <input type="text" id="status" v-model="status" required>
      </div>
      <div>
        <label for="dataAbertura">Data de Abertura:</label>
        <input type="datetime-local" id="dataAbertura" v-model="dataAbertura" required>
      </div>
      <div>
        <label for="usuarioId">ID do Usuário:</label>
        <input type="number" id="usuarioId" v-model="usuarioId" required>
      </div>
      <button type="submit">Atualizar Chamado</button>
    </form>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  name: 'ChamadosPage',
  data() {
    return {
      id: '',
      title: '',
      description: '',
      status: '',
      dataAbertura: '',
      usuarioId: ''
    };
  },
  methods: {
    async updateChamado() {
      try {
        const updatedChamado = {
          title: this.title,
          description: this.description,
          status: this.status,
          dataAbertura: new Date(this.dataAbertura).toISOString(),
          usuarioId: this.usuarioId
        };
        await api.put(`/chamados/${this.id}`, updatedChamado);
        this.id = '';
        this.title = '';
        this.description = '';
        this.status = '';
        this.dataAbertura = '';
        this.usuarioId = '';
        alert('Chamado atualizado com sucesso!');
      } catch (error) {
        console.error('Erro ao atualizar chamado:', error);
        alert('Erro ao atualizar chamado.');
      }
    },
  },
};
</script>