<template>
  <div class="login-container">
    <v-card class="login-card" outlined>
      <v-img
        src="@/assets/geds-logo.png"
        alt="Logo GEDS"
        class="login-card__image"
        height="150"
      ></v-img>
      <v-card-title class="text-center">Acesse o GEDS</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="login" class="login-form">
          <v-text-field
            label="Usuário"
            v-model="username"
            required
          ></v-text-field>
          <v-text-field
            label="Senha"
            v-model="password"
            type="password"
            required
          ></v-text-field>
          <v-btn type="submit" color="primary" class="mt-4">Entrar</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import api from '../services/api';
import auth from '../services/auth';

export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
      timeDifference: null,
    };
  },
  methods: {
    async login() {
      if (auth.checkToken()) {
        this.$router.push('/');
        return;
      }

      try {
        const serverTimeResponse = await api.get('/server-time');
        const serverTime = new Date(serverTimeResponse.data.serverTime).getTime();
        const clientTime = new Date().getTime();
        this.timeDifference = Math.abs((serverTime - clientTime) / 1000);

        const response = await api.post('/auth/login', {
          username: this.username,
          password: this.password,
        });

        localStorage.setItem('token', response.data.token);
        this.$router.push('/');
      } catch (error) {
        console.error('Error logging in:', error);
        alert('Usuário ou senha inválidos');
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #f0f2f5, #ffffff);
  overflow: hidden;
}
.login-card {
  width: 400px;
  max-width: 90%;
  padding-bottom: 2rem;
}
.login-card__image {
  border-radius: 8px 8px 0 0;
}
</style>
