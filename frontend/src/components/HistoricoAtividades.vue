<template>
    <v-card outlined>
      <v-card-title>Histórico de Atividades</v-card-title>
      <v-card-text>
        <div v-if="historicoAtividades && historicoAtividades.length">
          <v-list>
            <v-list-item
              v-for="atividade in historicoAtividades"
              :key="atividade.id"
            >
              <v-list-item-content>
                <v-list-item-title>
                  <strong>{{ atividade.User ? atividade.User.username : 'Usuário desconhecido' }}:</strong>
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ atividade.acao }} - {{ atividade.detalhes }}
                </v-list-item-subtitle>
                <small>{{ new Date(atividade.createdAt).toLocaleString() }}</small>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>
        <div v-else>Sem histórico de atividades.</div>
      </v-card-text>
    </v-card>
  </template>
  
  <script>
  export default {
    name: "HistoricoAtividades",
    props: {
      historicoAtividades: Array,
    },
  };
  </script>
  
  <style scoped>
  .v-card {
    margin-bottom: 20px;
  }
  </style>
  