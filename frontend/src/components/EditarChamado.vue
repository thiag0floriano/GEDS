<template>
  <v-card outlined>
    <v-card-title>{{ chamadoId ? "Editar Chamado" : "Criar Chamado" }}</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="onSalvarChamado">
        <v-text-field
          label="Título"
          v-model="localTitulo"
          required
        ></v-text-field>
        
        <v-textarea
          label="Descrição"
          v-model="localDescricao"
          required
        ></v-textarea>

        <v-select
          v-if="chamadoId"
          label="Status"
          v-model="localStatus"
          :items="statusOptions"
          @change="onStatusChange"
          required
        ></v-select>

        <v-text-field
          label="Data de Abertura"
          v-model="formattedDataAbertura"
          readonly
          v-if="chamadoId"
        ></v-text-field>

        <v-text-field
          label="Data de Fechamento"
          v-model="formattedDataFechamento"
          readonly
          v-if="chamadoId && localDataFechamento"
        ></v-text-field>

        <v-btn color="primary" type="submit">
          {{ chamadoId ? "Salvar" : "Criar" }} Chamado
        </v-btn>
        <v-btn color="secondary" @click="cancelarEdicao">Cancelar</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "EditarChamado",
  props: {
    chamadoId: Number,
    titulo: String,
    descricao: String,
    status: String,
    dataAbertura: String,
    dataFechamento: String,
    statusOptions: Array,
  },
  data() {
    return {
      localTitulo: this.titulo,
      localDescricao: this.descricao,
      localStatus: this.status,
      localDataAbertura: this.dataAbertura,
      localDataFechamento: this.dataFechamento,
    };
  },
  computed: {
    formattedDataAbertura: {
      get() {
        return this.formatarData(this.localDataAbertura);
      },
      set(newValue) {
        this.localDataAbertura = newValue;
      }
    },
    formattedDataFechamento: {
      get() {
        return this.formatarData(this.localDataFechamento);
      },
      set(newValue) {
        this.localDataFechamento = newValue;
      }
    },
  },
  methods: {
    onSalvarChamado() {
      this.$emit("salvarChamado", {
        titulo: this.localTitulo,
        descricao: this.localDescricao,
        status: this.localStatus,
        dataAbertura: this.localDataAbertura,
        dataFechamento: this.localDataFechamento,
      });
    },
    onStatusChange() {
      if (this.localStatus === "Fechado") {
        const agora = new Date();
        this.localDataFechamento = agora.toISOString(); // Formato ISO completo
        this.$emit("update:dataFechamento", this.localDataFechamento);
      } else {
        this.localDataFechamento = null; // Define como null
        this.$emit("update:dataFechamento", this.localDataFechamento);
      }
    },
    cancelarEdicao() {
      this.$emit("cancelarEdicao");
    },
    formatarData(data) {
      if (!data) return "";
      const options = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      return new Date(data).toLocaleString("pt-BR", options);
    },
  },
  watch: {
    titulo(newVal) {
      this.localTitulo = newVal;
    },
    descricao(newVal) {
      this.localDescricao = newVal;
    },
    status(newVal) {
      this.localStatus = newVal;
    },
    dataAbertura(newVal) {
      this.localDataAbertura = newVal;
    },
    dataFechamento(newVal) {
      this.localDataFechamento = newVal;
    },
  },
};
</script>

<style scoped>
.v-card {
  margin-bottom: 20px;
}
</style>