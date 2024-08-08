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

export default {
  name: 'HomePage',
  data() {
    return {
      chamados: [],
    };
  },
  created() {
    this.fetchChamados();
  },
  methods: {
    async fetchChamados() {
      try {
        console.log('Fetching chamados with token:', localStorage.getItem('token'));
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
