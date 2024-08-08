<template>
    <div>
      <h1>Register</h1>
      <form @submit.prevent="register">
        <div>
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  </template>
  
  <script>
  import api from '../services/api';
  
  export default {
    name: 'RegisterPage',
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      async register() {
        try {
          await api.post('/auth/register', {
            username: this.username,
            password: this.password,
          });
          alert('User registered successfully');
          this.$router.push('/login');
        } catch (error) {
          console.error('Error registering user:', error);
          alert('Registration failed');
        }
      },
    },
  };
  </script>
  