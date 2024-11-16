<template>
  <v-container>
    <h1>Relatórios de Desempenho</h1>

    <v-row>
      <!-- Gráfico de Chamados por Status -->
      <v-col cols="12" md="6">
        <v-card outlined class="p-4">
          <h2>Chamados por Status</h2>
          <ChartComponent
            v-if="dadosChamados"
            :data="dadosChamadosChartData"
            :options="chartOptions"
            chartType="bar"
          />
          <div v-else class="text-center">
            <p>Carregando dados de chamados...</p>
          </div>
        </v-card>
      </v-col>

      <!-- Gráfico de Tarefas por Usuário -->
      <v-col cols="12" md="6">
        <v-card outlined class="p-4">
          <h2>Tarefas por Usuário</h2>
          <ChartComponent
            v-if="dadosTarefasPorUsuario"
            :data="dadosTarefasPorUsuarioChartData"
            :options="chartOptions"
            chartType="bar"
          />
          <div v-else class="text-center">
            <p>Carregando dados de tarefas...</p>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ChartComponent from "@/components/ChartComponent";
import api from "../services/api";

export default {
  components: {
    ChartComponent,
  },
  data() {
    return {
      dadosChamados: null,
      dadosTarefasPorUsuario: null,
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          tooltip: {
            enabled: true,
          },
        },
      },
    };
  },
  computed: {
    dadosChamadosChartData() {
      return this.dadosChamados
        ? {
            labels: ["Aberto", "Pendente", "Espera", "Fechado"],
            datasets: [
              {
                label: "Chamados",
                backgroundColor: ["#42A5F5", "#FFA726", "#FF7043", "#66BB6A"],
                data: [
                  this.dadosChamados.chamadosAbertos,
                  this.dadosChamados.chamadosPendentes,
                  this.dadosChamados.chamadosEspera,
                  this.dadosChamados.chamadosFechados,
                ],
              },
            ],
          }
        : null;
    },
    dadosTarefasPorUsuarioChartData() {
      return this.dadosTarefasPorUsuario
        ? {
            labels: this.dadosTarefasPorUsuario.map((item) => item.usuario),
            datasets: [
              {
                label: "Tarefas",
                backgroundColor: "#42A5F5",
                data: this.dadosTarefasPorUsuario.map((item) => item.totalTarefas),
              },
            ],
          }
        : null;
    },
  },
  methods: {
    async carregarDadosRelatorios() {
      try {
        // Carregar dados de chamados por status
        const chamadosPorStatusResponse = await api.get("/relatorios/chamados-por-status");
        const chamadosPorStatus = chamadosPorStatusResponse.data.reduce((acc, item) => {
          acc[item.status.toLowerCase()] = item.count || 0; // Garante que os valores estejam em minúsculas
          return acc;
        }, {});

        this.dadosChamados = {
          chamadosAbertos: chamadosPorStatus.aberto || 0,
          chamadosPendentes: chamadosPorStatus.pendente || 0,
          chamadosEspera: chamadosPorStatus.espera || 0,
          chamadosFechados: chamadosPorStatus.fechado || 0,
        };

        // Carregar dados de tarefas por usuário
        const tarefasPorUsuarioResponse = await api.get("/relatorios/tarefas-por-usuario");
        this.dadosTarefasPorUsuario = tarefasPorUsuarioResponse.data || [];
      } catch (error) {
        console.error("Erro ao carregar dados de relatórios:", error);
      }
    },

  },
  mounted() {
    this.carregarDadosRelatorios();
  },
};
</script>

<style scoped>
h1 {
  margin-bottom: 20px;
  color: #3f51b5;
  text-align: center;
}
h2 {
  margin-top: 10px;
  font-weight: bold;
}
.text-center {
  text-align: center;
  color: #888;
}
.v-card {
  margin-bottom: 20px;
}
</style>
