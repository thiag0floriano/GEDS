<template>
  <div>
    <h2>Registrar Usuário</h2>
    <form @submit.prevent="registrarUsuario">
      <label for="username">Username:</label>
      <input type="text" v-model="username" required />

      <label for="password">Password:</label>
      <input type="password" v-model="password" required />

      <button type="submit">Registrar</button>
    </form>
  </div>
</template>
  
<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async registrarUsuario() {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/register', {
          username: this.username,
          password: this.password
        });
        alert(response.data.message);
      } catch (error) {
        console.error("Erro ao registrar o usuário:", error);
        alert("Erro ao registrar o usuário.");
      }
    }
  }
};
</script>
  