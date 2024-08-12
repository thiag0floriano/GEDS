<template>
  <div>
    <h1>Chamados</h1>
    <ul>
      <li v-for="chamado in chamados" :key="chamado.id">
        {{ chamado.title }} - {{ chamado.description }}
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
</script>
