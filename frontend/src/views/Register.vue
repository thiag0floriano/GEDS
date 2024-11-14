<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card>
          <v-card-title class="text-h5">Registrar Usuário</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="registrarUsuario">
              <!-- Campos de Nome e Sobrenome -->
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="nome"
                    label="Nome"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="sobrenome"
                    label="Sobrenome"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

              <!-- Campos de Nome de Usuário e Telefone -->
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="username"
                    label="Usuário"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="formattedTelefone"
                    label="Telefone"
                    placeholder="(99) 9 9999-9999"
                    outlined
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

              <!-- Campos de Email e Confirmação de Email -->
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="email"
                    label="E-mail"
                    type="email"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="confirmEmail"
                    label="Confirme o E-mail"
                    type="email"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

              <!-- Campos de Senha e Confirmação de Senha -->
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    label="Senha"
                    required
                    append-inner-icon="mdi-eye"
                    @click:append-inner="togglePasswordVisibility"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="confirmPassword"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    label="Confirme a Senha"
                    required
                    append-inner-icon="mdi-eye"
                    @click:append-inner="toggleConfirmPasswordVisibility"
                  ></v-text-field>
                </v-col>
              </v-row>

              <!-- Campo de Nível de Usuário -->
              <v-row>
                <v-col cols="12">
                  <v-select
                    v-model="nivel"
                    :items="nivelOptions"
                    label="Nível de Usuário"
                    required
                  ></v-select>
                </v-col>
              </v-row>

              <!-- Botões de Ação -->
              <v-card-actions>
                <v-btn color="primary" type="submit">Registrar</v-btn>
                <v-btn color="secondary" @click="limparCampos">Limpar</v-btn>
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
      nome: "",
      sobrenome: "",
      username: "",
      email: "",
      confirmEmail: "",
      telefone: "",
      nivel: "",
      password: "",
      confirmPassword: "",
      nivelOptions: ["Admin", "Usuário", "Suporte"],
      showPassword: false,
      showConfirmPassword: false,
    };
  },
  computed: {
    formattedTelefone: {
      get() {
        // Formata o telefone para (99) 9 9999-9999
        if (!this.telefone) return "";
        return this.telefone.replace(
          /^(\d{2})(\d{1})(\d{4})(\d{4})$/,
          "($1) $2 $3-$4"
        );
      },
      set(value) {
        // Remove caracteres não numéricos
        this.telefone = value.replace(/\D/g, "").slice(0, 11);
      },
    },
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    toggleConfirmPasswordVisibility() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },
    async registrarUsuario() {
      if (this.email !== this.confirmEmail) {
        alert("Os e-mails não coincidem!");
        return;
      }
      if (this.password !== this.confirmPassword) {
        alert("As senhas não coincidem!");
        return;
      }
      try {
        const response = await axios.post("http://localhost:5000/api/usuarios", {
          nome: this.nome,
          sobrenome: this.sobrenome,
          username: this.username,
          email: this.email,
          telefone: this.telefone,
          nivel: this.nivel,
          password: this.password,
        });
        alert(response.data.message);
        this.limparCampos();
      } catch (error) {
        console.error("Erro ao registrar o usuário:", error);
        alert("Erro ao registrar o usuário.");
      }
    },
    limparCampos() {
      this.nome = "";
      this.sobrenome = "";
      this.username = "";
      this.email = "";
      this.confirmEmail = "";
      this.telefone = "";
      this.nivel = "";
      this.password = "";
      this.confirmPassword = "";
    },
  },
};
</script>

<style scoped>
.v-card {
  padding: 20px;
}
</style>
