<template>
  <v-card outlined class="pa-4">
    <!-- Título e Protocolo -->
    <v-card-title class="d-flex justify-space-between">
      <div>{{ chamadoId ? "Editar Chamado" : "Criar Chamado" }}</div>
      <div v-if="chamadoId" class="text-subtitle-2 grey--text">{{ `ID - ${localProtocolo}` }}</div>
    </v-card-title>

    <v-card-text>
      <v-form @submit.prevent="onSalvarChamado" class="form-spacing">
        <!-- Aberto Por e Solicitado Por -->
        <v-row dense class="mt-4">
          <v-col cols="12" md="6">
            <v-text-field
              label="Aberto por"
              v-model="localAbertoPor"
              readonly
              class="mt-4"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Solicitado por"
              v-model="localSolicitadoPor"
              class="mt-4"
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- Título e Status -->
        <v-row dense>
          <v-col cols="12" md="8">
            <v-text-field
              label="Título"
              v-model="localTitulo"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-select
              label="Status"
              v-model="localStatus"
              :items="statusOptions"
              @change="onStatusChange"
              required
            ></v-select>
          </v-col>
        </v-row>

        <!-- Descrição -->
        <v-row dense>
          <v-col cols="12">
            <v-textarea
              label="Descrição"
              v-model="localDescricao"
              required
            ></v-textarea>
          </v-col>
        </v-row>

        <!-- Data de Abertura e Fechamento -->
        <v-row dense>
          <v-col cols="12" md="6">
            <v-text-field
              label="Data de Abertura"
              v-model="formattedDataAbertura"
              readonly
              v-if="chamadoId"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Data de Fechamento"
              v-model="formattedDataFechamento"
              readonly
              v-if="chamadoId && localDataFechamento"
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- Botões -->
        <v-row dense>
          <v-col cols="12" class="d-flex justify-end">
            <v-btn color="primary" type="submit">
              {{ chamadoId ? "Salvar" : "Criar" }} Chamado
            </v-btn>
            <v-btn color="secondary" @click="cancelarEdicao" class="ml-2">
              Cancelar
            </v-btn>
          </v-col>
        </v-row>
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
    abertoPor: String,
    solicitadoPor: String,
    protocolo: String,
    statusOptions: Array,
  },
  data() {
    return {
      localTitulo: this.titulo,
      localDescricao: this.descricao,
      localStatus: this.status,
      localDataAbertura: this.dataAbertura,
      localDataFechamento: this.dataFechamento,
      localAbertoPor: this.abertoPor || "",
      localSolicitadoPor: this.solicitadoPor || "",
      localProtocolo: this.protocolo || "",
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
        solicitadoPor: this.localSolicitadoPor,
      });
    },
    onStatusChange() {
      if (this.localStatus === "Fechado") {
        const agora = new Date();
        this.localDataFechamento = agora.toISOString();
        this.$emit("update:dataFechamento", this.localDataFechamento);
      } else {
        this.localDataFechamento = null;
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
    abertoPor(newVal) {
      this.localAbertoPor = newVal;
    },
    solicitadoPor(newVal) {
      this.localSolicitadoPor = newVal;
    },
    protocolo(newVal) {
      this.localProtocolo = newVal;
    }
  },
};
</script>

<style scoped>
.v-card {
  margin-bottom: 20px;
}
.v-card-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
