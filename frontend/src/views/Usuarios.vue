<template>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-card>
            <v-card-title class="text-h5">Lista de Usuários</v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item-group>
                  <v-list-item
                    v-for="usuario in usuarios"
                    :key="usuario.id"
                    @click="selecionarUsuario(usuario)"
                  >
                    <v-list-item-content>
                      <v-list-item-title>{{ usuario.username }}</v-list-item-title>
                      <v-list-item-subtitle>{{ usuario.email }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
  
        <!-- Formulário de Edição de Usuário -->
        <v-col cols="12" md="8">
          <v-card v-if="usuarioSelecionado">
            <v-card-title class="text-h5">Editar Usuário</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="atualizarUsuario">
                <v-text-field
                  v-model="usuarioSelecionado.nome"
                  label="Nome"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="usuarioSelecionado.sobrenome"
                  label="Sobrenome"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="usuarioSelecionado.username"
                  label="Nome de Usuário"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="usuarioSelecionado.email"
                  label="E-mail"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="usuarioSelecionado.telefone"
                  label="Telefone"
                  :rules="[telefoneRule]"
                  placeholder="(99) 9 9999-9999"
                  outlined
                  required
                ></v-text-field>
                <v-select
                  v-model="usuarioSelecionado.nivel"
                  :items="nivelOptions"
                  label="Nível de Usuário"
                  required
                ></v-select>
                <v-card-actions>
                  <v-btn color="primary" type="submit">Salvar Alterações</v-btn>
                  <v-btn color="secondary" @click="cancelarEdicao">Cancelar</v-btn>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        usuarios: [],
        usuarioSelecionado: null,
        nivelOptions: ["Admin", "Usuário", "Suporte"],
        telefoneRule: (value) => {
          const telefonePattern = /\(\d{2}\) \d \d{4}-\d{4}/;
          return telefonePattern.test(value) || "Telefone inválido";
        },
      };
    },
    methods: {
      async carregarUsuarios() {
        try {
          const response = await axios.get("http://localhost:5000/api/usuarios");
          this.usuarios = response.data;
        } catch (error) {
          console.error("Erro ao carregar usuários:", error);
        }
      },
      selecionarUsuario(usuario) {
        this.usuarioSelecionado = { ...usuario };
      },
      async atualizarUsuario() {
        try {
          await axios.put(
            `http://localhost:5000/api/usuarios/${this.usuarioSelecionado.id}`,
            this.usuarioSelecionado
          );
          alert("Usuário atualizado com sucesso.");
          this.usuarioSelecionado = null;
          this.carregarUsuarios();
        } catch (error) {
          console.error("Erro ao atualizar usuário:", error);
          alert("Erro ao atualizar usuário.");
        }
      },
      cancelarEdicao() {
        this.usuarioSelecionado = null;
      },
    },
    mounted() {
      this.carregarUsuarios();
    },
  };
  </script>
  
  <style scoped>
  .v-card {
    margin-bottom: 20px;
  }
  </style>
  