<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title v-if="!isLoginPage">GEDS</v-toolbar-title>
      <template v-else>
        <v-toolbar-title class="text-center w-100">GEDS</v-toolbar-title>
      </template>
      <v-spacer></v-spacer>
      <v-btn v-if="!isLoginPage" to="/" text>Home</v-btn>
      <v-btn v-if="!isLoginPage" to="/novo-chamado" text>Chamado +</v-btn>
      <v-btn v-if="!isLoginPage" to="/tarefas" text>Tarefas</v-btn>

      <!-- Ícone de Configurações -->
      <v-menu v-if="!isLoginPage" offset-y>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon>mdi-cog-outline</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item link to="/usuarios">
            <v-list-item-title>Usuários</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/relatorios">
            <v-list-item-title>Relatórios</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/configuracoes">
            <v-list-item-title>Configurações</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

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

<style scoped>
.v-app-bar {
  z-index: 10;
}

#app {
  font-family: 'Roboto', sans-serif;
}
.v-application--wrap {
  min-height: 100vh;
}
</style>
