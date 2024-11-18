<template>
  <v-container>
    <!-- Título da Página -->
    <v-row>
      <v-col cols="12" class="text-center">
        <h1>Tarefas Atribuídas</h1>
      </v-col>
    </v-row>

    <!-- Filtros -->
    <FiltroTarefas
      :usuariosFormatados="usuariosFormatados"
      :statusOptions="statusOptions"
      @atualizar-filtros="atualizarFiltros"
    />
    <!-- Lista de Tarefas -->
    <v-row v-if="tarefasFiltradas.length">
      <v-col v-for="tarefa in tarefasFiltradas" :key="tarefa.id" cols="12" md="6" lg="4">
        <v-card outlined class="mb-4">
          <v-card-title class="d-flex justify-space-between">
            <span>{{ tarefa.titulo }}</span>
            <v-chip color="primary" outlined small>
              {{ tarefa.User?.username || "Sem responsável" }}
            </v-chip>
          </v-card-title>
          <v-card-subtitle>Status: {{ tarefa.status }}</v-card-subtitle>
          <v-card-text>{{ tarefa.descricao }}</v-card-text>

          <v-card-actions>
            <v-btn color="success" @click="alterarStatus(tarefa.id, 'Concluída')" text v-if="tarefa.status === 'pendente'">
              Marcar como Concluída
            </v-btn>
            <v-btn color="error" @click="excluirTarefa(tarefa.id)" text>
              Excluir Tarefa
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col cols="12" class="text-center">
        <p>Não há tarefas correspondentes aos filtros.</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "../services/api";
import FiltroTarefas from "../components/Filtro.vue";

export default {
  name: "Tarefas",
  components: {
    FiltroTarefas,
  },
  data() {
    return {
      tarefas: [],
      usuariosFormatados: [],
      filtroUsuario: null,
      filtroStatus: null,
      statusOptions: ["pendente", "Concluída"],
    };
  },
  computed: {
    tarefasFiltradas() {
      return this.tarefas.filter((tarefa) => {
        const filtroUsuario = this.filtroUsuario ? tarefa.User?.username === this.filtroUsuario : true;
        const filtroStatus = this.filtroStatus ? tarefa.status === this.filtroStatus : true;
        return filtroUsuario && filtroStatus;
      });
    },
  },
  methods: {
    async carregarTarefas() {
      try {
        const response = await api.get("/tarefas");
        this.tarefas = response.data;
      } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
        alert("Erro ao carregar tarefas");
      }
    },
    async carregarUsuarios() {
      try {
        const response = await api.get("/usuarios");
        this.usuariosFormatados = response.data.map((usuario) => usuario.username);
      } catch (error) {
        console.error("Erro ao carregar usuários:", error);
      }
    },
    atualizarFiltros({ usuario, status }) {
      this.filtroUsuario = usuario;
      this.filtroStatus = status;
    },
    async alterarStatus(tarefaId, novoStatus) {
      try {
        await api.put(`/tarefas/${tarefaId}`, { status: novoStatus });
        alert("Status da tarefa atualizado");
        this.carregarTarefas();
      } catch (error) {
        console.error("Erro ao atualizar status da tarefa:", error);
        alert("Erro ao atualizar status da tarefa");
      }
    },
    async excluirTarefa(tarefaId) {
      try {
        await api.delete(`/tarefas/${tarefaId}`);
        alert("Tarefa excluída com sucesso");
        this.carregarTarefas();
      } catch (error) {
        console.error("Erro ao excluir tarefa:", error);
        alert("Erro ao excluir tarefa");
      }
    },
  },
  async mounted() {
    await this.carregarUsuarios();
    await this.carregarTarefas();
  },
};
</script>

<style scoped>
.v-card {
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.v-card-title {
  font-size: 1.1rem;
  font-weight: bold;
}
</style>
