<template>
    <div>
      <h1>Login</h1>
      <form @submit.prevent="login">
        <div>
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import api from '../services/api';
  
  export default {
    name: 'LoginPage',
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      async login() {
        try {
          const response = await api.post('/auth/login', {
            username: this.username,
            password: this.password,
          });
          localStorage.setItem('token', response.data.token);
          this.$router.push('/');
        } catch (error) {
          console.error('Error logging in:', error);
          alert('Invalid username or password');
        }
      },
    },
  };
  </script>
  