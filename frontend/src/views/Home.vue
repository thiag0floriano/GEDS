<!-- <template>
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
</script> -->

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <h1 class="text-center mb-6">Lista de Chamados</h1>
        <v-row>
          <v-col cols="12" md="6" v-for="chamado in chamados" :key="chamado.id">
            <v-card outlined>
              <v-card-title>{{ chamado.titulo }}</v-card-title>
              <v-card-subtitle>{{ chamado.descricao }}</v-card-subtitle>
              <v-card-actions>
                <v-btn color="primary" @click="acessarChamado(chamado.id)">Acessar Chamado</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
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

<style scoped>
h1 {
  font-weight: bold;
}
</style>
