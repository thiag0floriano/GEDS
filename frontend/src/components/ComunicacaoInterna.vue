<template>
  <v-card outlined class="chat-card pa-4">
    <v-card-title class="chat-title">Comunicação Interna</v-card-title>

    <v-card-text class="chat-container">
      <div v-if="mensagens.length">
        <div
          v-for="mensagem in mensagens"
          :key="mensagem.id"
          class="message-row"
          :class="{ 'sent': mensagem.User?.username === usuarioAtual, 'received': mensagem.User?.username !== usuarioAtual }"
        >
          <div class="message-bubble">
            <div class="message-info-top">
              <span class="message-user">{{ mensagem.User?.username || "Usuário desconhecido" }}</span>
              <span class="message-time">{{ formatarDataHora(mensagem.data_envio) }}</span>
            </div>
            <div class="message-text">{{ mensagem.conteudo }}</div>
          </div>
        </div>
      </div>
      <div v-else>Sem mensagens ainda.</div>
    </v-card-text>

    <v-card-actions class="chat-input">
      <v-text-field
        v-model="localNovaMensagem"
        label="Digite uma mensagem..."
        dense
        outlined
        hide-details
        class="message-input"
        @keyup.enter="enviarMensagem"
      ></v-text-field>
      <v-btn icon color="primary" @click="enviarMensagem">
        <v-icon>mdi-send</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ComunicacaoInterna",
  props: {
    mensagens: Array,
    novaMensagem: String,
    usuarioAtual: String, // Nome do usuário logado
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
  mounted() {
    console.log("Usuário atual:", this.usuarioAtual);
  },
  methods: {
    enviarMensagem() {
      if (this.localNovaMensagem.trim() !== "") {
        this.$emit("enviarMensagem", this.localNovaMensagem.trim());
        this.localNovaMensagem = ""; // Limpa o campo após enviar
      }
    },
    formatarDataHora(data) {
      if (!data) return "";
      const options = { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit", year: "numeric" };
      return new Date(data).toLocaleString("pt-BR", options);
    },
  },
};
</script>

<style scoped>
.chat-card {
  max-height: 500px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: #ffffff;
}

.chat-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #3f51b5;
  padding-bottom: 8px;
}

.chat-container {
  overflow-y: auto;
  max-height: 400px;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 8px;
}

.message-row {
  display: flex;
  margin-bottom: 8px;
}

.message-row.sent {
  justify-content: flex-end;
}

.message-row.received {
  justify-content: flex-start;
}

.message-bubble {
  max-width: 70%;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: #e0e0e0;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
}

.message-row.sent .message-bubble {
  background-color: #dcf8c6;
  text-align: right;
}

.message-row.received .message-bubble {
  background-color: #ffffff;
  text-align: left;
}

.message-info-top {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 4px;
}

.message-text {
  font-size: 0.9rem;
}

.chat-input {
  display: flex;
  align-items: center;
  padding-top: 8px;
}

.message-input {
  flex-grow: 1;
  margin-right: 8px;
}
</style>
