<template>
  <v-card outlined>
    <v-card-title>Comunicação Interna</v-card-title>
    <v-card-text>
      <div v-if="mensagens.length">
        <v-list>
          <v-list-item v-for="mensagem in mensagens" :key="mensagem.id">
            <v-list-item-content>
              <v-list-item-title>
                <strong>{{ mensagem.User ? mensagem.User.username : 'Usuário desconhecido' }}:</strong>
              </v-list-item-title>
              <v-list-item-subtitle>{{ mensagem.conteudo }}</v-list-item-subtitle>
              <small>{{ new Date(mensagem.data_envio).toLocaleString() }}</small>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
      <div v-else>Sem mensagens ainda.</div>

      <v-text-field
        v-model="localNovaMensagem"
        label="Digite uma mensagem..."
        @keyup.enter="enviarMensagem"
      ></v-text-field>
      <v-btn color="primary" @click="enviarMensagem">Enviar</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ComunicacaoInterna",
  props: {
    mensagens: Array,
    novaMensagem: String,
  },
  data() {
    return {
      localNovaMensagem: this.novaMensagem || "",
    };
  },
  emits: ["enviarMensagem", "update:novaMensagem"],
  watch: {
    localNovaMensagem(value) {
      this.$emit("update:novaMensagem", value);
    },
  },
  methods: {
    enviarMensagem() {
      if (this.localNovaMensagem.trim() !== "") {
        this.$emit("enviarMensagem", this.localNovaMensagem.trim());
        this.localNovaMensagem = ""; // Limpa o campo após enviar
      }
    },
  },
};
</script>
