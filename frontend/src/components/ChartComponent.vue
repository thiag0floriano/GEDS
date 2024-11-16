<template>
  <div>
    <Bar :data="data" :options="options" v-if="chartType === 'bar'" />
    <Pie :data="data" :options="options" v-if="chartType === 'pie'" />
    <Doughnut :data="data" :options="options" v-if="chartType === 'doughnut'" />
    <!-- Adicione outros tipos de gráficos conforme necessário -->
  </div>
</template>
  
<script>
import { Bar, Pie, Doughnut } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, ArcElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, ArcElement, CategoryScale, LinearScale);

export default {
  name: "ChartComponent",
  components: {
    Bar,
    Pie,
    Doughnut,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      required: false,
      default: () => ({
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
        },
        scales: {
          scales: {
            y: {
              type: "linear",
              suggestedMin: 0,
              suggestedMax: 10, // Ajuste conforme necessário
              ticks: {
                stepSize: 1,
                callback: value => (Number.isInteger(value) ? value : ""),
              },
            },
          },
        },
      }),
    },
    chartType: {
      type: String,
      required: true,
      default: "bar",
    },
  },
};
</script>

<style scoped>
/* Adicione estilos personalizados aqui se necessário */
</style>
  