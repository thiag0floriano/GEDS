<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title v-if="!isLoginPage">GEDS</v-toolbar-title>
      <template v-else>
        <v-toolbar-title class="text-center w-100">GEDS</v-toolbar-title>
      </template>
      <v-spacer></v-spacer>
      <v-btn v-if="!isLoginPage" to="/" text>Home</v-btn>
      <v-btn v-if="!isLoginPage" to="/chamados" text>Chamado +</v-btn>
      <v-btn v-if="!isLoginPage" to="/relatorios" text>Relatórios</v-btn>
      <v-btn v-if="!isLoginPage" @click="logout" text>Sair</v-btn>
    </v-app-bar>
    <v-main>
      <v-container class="py-4">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  computed: {
    isLoginPage() {
      return this.$route.path === '/login';
    },
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
  },
};
</script>

<style>
#app {
  font-family: 'Roboto', sans-serif;
}
.v-application--wrap {
  min-height: 100vh;
}
</style>
