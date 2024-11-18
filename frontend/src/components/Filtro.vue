<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-select
        v-model="filtroUsuario"
        :items="usuariosFormatados"
        :label="labelUsuario"
        clearable
      ></v-select>
    </v-col>
    <v-col cols="12" md="6">
      <v-select
        v-model="filtroStatus"
        :items="statusOptions"
        label="Status"
        clearable
      ></v-select>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "FiltroTarefas",
  props: {
    usuariosFormatados: {
      type: Array,
      required: true,
    },
    statusOptions: {
      type: Array,
      required: true,
    },
    labelUsuario: {
      type: String,
      required: true,
      default: "Atribuído a",
    },
  },
  data() {
    return {
      filtroUsuario: null,
      filtroStatus: null,
    };
  },
  emits: ["atualizar-filtros"],
  watch: {
    filtroUsuario() {
      this.atualizarFiltros();
    },
    filtroStatus() {
      this.atualizarFiltros();
    },
  },
  methods: {
    atualizarFiltros() {
      this.$emit("atualizar-filtros", {
        usuario: this.filtroUsuario,
        status: this.filtroStatus,
      });
    },
  },
};
</script>