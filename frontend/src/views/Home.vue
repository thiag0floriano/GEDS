<!-- <template>
  <div>
    <h1>Chamados</h1>
    <ul>
      <li v-for="chamado in chamados" :key="chamado.id">
        {{ chamado.titulo }} - {{ chamado.descricao }}
      </li>
    </ul>
  </div>
</template>

<script>
import api from '../services/api';
import auth from '../services/auth'; // Ajuste o caminho para o arquivo auth.js

export default {
  name: 'HomePage',
  data() {
    return {
      chamados: [],
    };
  },
  created() {
    if (auth.checkToken()) {
      this.fetchChamados();
    } else {
      // O token está expirado, redireciona para a página de login
      this.$router.push('/login');
    }
  },
  methods: {
    async fetchChamados() {
      try {
        const response = await api.get('/chamados');
        this.chamados = response.data;
      } catch (error) {
        console.error('Error fetching chamados:', error);
        alert('Failed to fetch chamados. Please check the console for details.');
      }
    },
  },
};
</script> -->

<template>
  <div>
    <h1>Lista de Chamados</h1>
    <ul>
      <li v-for="chamado in chamados" :key="chamado.id">
        <p><strong>Título:</strong> {{ chamado.titulo }}</p>
        <p><strong>Descrição:</strong> {{ chamado.descricao }}</p>
        <button @click="acessarChamado(chamado.id)">Acessar Chamado</button>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return {
      chamados: [],
    };
  },
  async created() {
    try {
      const response = await api.get('/chamados');
      this.chamados = response.data;
    } catch (error) {
      console.error('Erro ao buscar chamados:', error);
    }
  },
  methods: {
    acessarChamado(id) {
      this.$router.push({ name: 'Chamados', params: { id } });
    },
  },
};
</script>
