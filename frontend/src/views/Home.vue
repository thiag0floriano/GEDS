<template>
  <v-container>
    <!-- Título da Página -->
    <v-row>
      <v-col cols="12" class="text-center">
        <h1>Lista de Chamados</h1>
      </v-col>
    </v-row>

    <!-- Filtros -->
    <FiltroTarefas
      :usuariosFormatados="usuariosFormatados"
      :statusOptions="statusOptions"
      @atualizar-filtros="atualizarFiltros"
      labelUsuario="Aberto por"
    />

    <!-- Lista de Chamados -->
    <v-row v-if="chamadosFiltrados.length">
      <v-col v-for="chamado in chamadosFiltrados" :key="chamado.id" cols="12" md="6" lg="4">
        <v-card outlined class="modern-card">
          <v-card-title class="card-title d-flex justify-space-between">
            <span>{{ chamado.titulo }}</span>
            <v-chip color="primary" outlined small>
              {{ chamado.User?.username || "Sem responsável" }}
            </v-chip>
          </v-card-title>
          <v-card-text>
            <div>{{ chamado.descricao }}</div>
            <v-chip
              :class="statusClass(chamado.status)"
              class="mt-2"
              outlined
            >
              {{ chamado.status }}
            </v-chip>
          </v-card-text>
          <v-card-actions>
            <v-btn
              class="acessar-chamado-btn"
              @click="acessarChamado(chamado.id)"
            >
              Acessar Chamado
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col cols="12" class="text-center">
        <p>Não há chamados correspondentes aos filtros.</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "../services/api";
import FiltroTarefas from "../components/Filtro.vue";

export default {
  name: "Home",
  components: {
    FiltroTarefas,
  },
  data() {
    return {
      chamados: [],
      usuariosFormatados: [],
      filtroUsuario: null,
      filtroStatus: null,
      statusOptions: ["Aberto", "Pendente", "Espera", "Fechado"],
    };
  },
  computed: {
    chamadosFiltrados() {
      return this.chamados.filter((chamado) => {
        const filtroUsuario = this.filtroUsuario ? chamado.User?.username === this.filtroUsuario : true;
        const filtroStatus = this.filtroStatus ? chamado.status === this.filtroStatus : true;
        return filtroUsuario && filtroStatus;
      });
    },
  },
  methods: {
    async carregarChamados() {
      try {
        const response = await api.get("/chamados");
        this.chamados = response.data;
      } catch (error) {
        console.error("Erro ao carregar chamados:", error);
        alert("Erro ao carregar chamados");
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
    acessarChamado(chamadoId) {
      this.$router.push(`/chamados/${chamadoId}`);
    },
    statusClass(status) {
      switch (status.toLowerCase()) {
        case "aberto":
          return "status-aberto";
        case "fechado":
          return "status-fechado";
        case "pendente":
          return "status-pendente";
        case "espera":
          return "status-espera";
        default:
          return "";
      }
    },
  },
  async mounted() {
    await this.carregarUsuarios();
    await this.carregarChamados();
  },
};
</script>

<style scoped>
/* Modernização dos Cards */
.modern-card {
  border-radius: 10px; /* Bordas arredondadas */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra */
  transition: transform 0.2s, box-shadow 0.2s;
}

.modern-card:hover {
  transform: translateY(-5px); /* Elevação no hover */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Aumento da sombra no hover */
}

.card-title {
  font-weight: bold;
  font-size: 1.2rem;
  color: #3f51b5; /* Azul moderno */
}

/* Status */
.status-aberto {
  background-color: #4caf50; /* Verde */
  color: white;
}

.status-fechado {
  background-color: #f44336; /* Vermelho */
  color: white;
}

.status-pendente {
  background-color: #ff9800; /* Laranja */
  color: white;
}

.status-espera {
  background-color: #9c27b0; /* Lilás */
  color: white;
}

/* Botão Modernizado */
.acessar-chamado-btn {
  background: linear-gradient(to right, #186cb5, #3f8adb); /* Gradiente */
  color: white;
  /* font-weight: bold; */
  border-radius: 5px;
  padding: 10px 20px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.acessar-chamado-btn:hover {
  transform: scale(1.02);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}
</style>
