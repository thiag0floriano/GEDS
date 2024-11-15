<template>
  <v-card outlined class="historico-card pa-4">
    <v-card-title class="historico-title">Histórico de Atividades</v-card-title>

    <v-card-text class="historico-container">
      <div v-if="historicoAtividades && historicoAtividades.length">
        <v-list dense>
          <v-list-item
            v-for="atividade in historicoAtividades"
            :key="atividade.id"
            class="atividade-item"
          >
            <v-list-item-avatar>
              <v-icon color="primary" size="32">
                mdi-account-circle
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <div class="atividade-header">
                <strong class="atividade-usuario">
                  {{ atividade.User ? atividade.User.username : "Usuário desconhecido" }}
                </strong>
                <span class="atividade-data">
                  {{ formatarDataHora(atividade.createdAt) }}
                </span>
              </div>
              <div class="atividade-detalhes">
                <span>{{ atividade.acao }} - {{ atividade.detalhes }}</span>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
      <div v-else class="historico-empty">
        Sem histórico de atividades.
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "HistoricoAtividades",
  props: {
    historicoAtividades: Array,
  },
  methods: {
    formatarDataHora(data) {
      if (!data) return "";
      const options = {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      };
      return new Date(data).toLocaleString("pt-BR", options);
    },
  },
};
</script>

<style scoped>
.historico-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #ffffff; /* Borda externa */
  border-radius: 8px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
}

.historico-container {
  overflow-y: auto;
  max-height: 380px;
  padding: 8px;
  background-color: #f9f9f9; /* Fundo interno igual ao chat */
  border-radius: 8px;
}

.historico-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #3f51b5;
}

.atividade-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 12px;
  border-bottom: 1px solid #e0e0e0; /* Bordas mais suaves */
  padding-bottom: 8px;
}

.atividade-item:last-child {
  border-bottom: none;
}

.atividade-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 4px;
}

.atividade-usuario {
  font-weight: bold;
  color: #3f51b5;
}

.atividade-data {
  font-size: 0.8rem;
  color: #999;
}

.atividade-detalhes {
  font-size: 0.95rem;
  color: #444;
  margin-top: 4px;
}

.historico-empty {
  text-align: center;
  color: #999;
  font-size: 1rem;
  margin-top: 20px;
}
</style>
