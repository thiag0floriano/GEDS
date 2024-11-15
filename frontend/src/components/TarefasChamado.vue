<template>
  <v-card outlined>
    <!-- Título com quantidade de tarefas -->
    <v-card-title class="text-h6 font-weight-bold d-flex justify-space-between align-center">
      <span>Tarefas do Chamado</span>
      <v-chip color="primary" outlined small>
        {{ tarefas.length }} {{ tarefas.length === 1 ? "tarefa" : "tarefas" }}
      </v-chip>
    </v-card-title>

    <v-card-text>
      <!-- Carrossel de Tarefas -->
      <div v-if="tarefas.length" class="tarefas-carrossel">
        <v-row dense>
          <v-slide-group>
            <v-slide-item
              v-for="tarefa in tarefas"
              :key="tarefa.id"
              class="tarefa-item"
            >
              <v-card outlined class="tarefa-card">
                <v-card-title class="tarefa-title">
                  {{ tarefa.titulo }}
                </v-card-title>
                <v-card-text>
                  <div class="tarefa-descricao">{{ tarefa.descricao }}</div>
                  <div class="tarefa-status d-flex justify-space-between align-center">
                    <span>{{ tarefa.status }}</span>
                    <v-icon
                      small
                      color="error"
                      class="cursor-pointer tarefa-lixeira"
                      @click="excluirTarefa(tarefa.id)"
                    >
                      mdi-trash-can-outline
                    </v-icon>
                  </div>
                </v-card-text>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-row>
      </div>

      <div v-else class="text-center my-4">
        Este chamado ainda não possui tarefas.
      </div>

      <!-- Formulário para Adicionar Tarefa -->
      <v-divider class="my-4"></v-divider>
      <v-card-subtitle class="text-h6 font-weight-bold mb-3">
        Adicionar Tarefa
      </v-card-subtitle>

      <v-form @submit.prevent="adicionarTarefa" class="tarefas-form">
        <v-text-field
          label="Título"
          v-model="localTituloTarefa"
          :rules="[v => !!v || 'Título é obrigatório']"
          required
        ></v-text-field>

        <v-textarea
          label="Descrição"
          v-model="localDescricaoTarefa"
          :rules="[v => !!v || 'Descrição é obrigatória']"
          rows="2"
          required
        ></v-textarea>

        <v-select
          label="Atribuir a"
          :items="usuariosFormatados"
          v-model="localUsuarioIdTarefa"
          item-text="text"
          item-value="value"
          required
        ></v-select>

        <!-- Botão Adicionar Tarefa Ajustado -->
        <v-btn color="primary" type="submit" class="add-tarefa-btn">
          Adicionar Tarefa
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "TarefasChamado",
  props: {
    tarefas: Array,
    usuariosFormatados: Array,
    tituloTarefa: String,
    descricaoTarefa: String,
    usuarioIdTarefa: [String, Number],
  },
  emits: [
    "adicionar-tarefa",
    "excluir-tarefa",
    "update:tituloTarefa",
    "update:descricaoTarefa",
    "update:usuarioIdTarefa",
  ],
  data() {
    return {
      localTituloTarefa: this.tituloTarefa || "",
      localDescricaoTarefa: this.descricaoTarefa || "",
      localUsuarioIdTarefa: this.usuarioIdTarefa || null,
    };
  },
  watch: {
    localTituloTarefa(value) {
      this.$emit("update:tituloTarefa", value);
    },
    localDescricaoTarefa(value) {
      this.$emit("update:descricaoTarefa", value);
    },
    localUsuarioIdTarefa(value) {
      this.$emit("update:usuarioIdTarefa", value);
    },
  },
  methods: {
    adicionarTarefa() {
      const tarefa = {
        titulo: this.localTituloTarefa,
        descricao: this.localDescricaoTarefa,
        usuarioId: this.localUsuarioIdTarefa,
      };
      this.$emit("adicionar-tarefa", tarefa);

      // Limpa os campos do formulário após adicionar
      this.localTituloTarefa = "";
      this.localDescricaoTarefa = "";
      this.localUsuarioIdTarefa = null;
    },
    excluirTarefa(tarefaId) {
      this.$emit("excluir-tarefa", tarefaId);
    },
  },
};
</script>

<style scoped>
.tarefa-card {
  border-radius: 8px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  max-width: 250px;
  margin: 0 8px;
  font-size: 0.9rem;
}

.tarefa-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.tarefa-title {
  font-size: 0.9rem;
  font-weight: bold;
  color: #3f51b5;
}

.tarefa-descricao {
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 8px;
}

.tarefa-status {
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.tarefa-lixeira {
  margin-left: 8px;
  cursor: pointer;
}

.tarefas-carrossel {
  display: flex;
  overflow-x: auto;
  padding: 8px 0;
  gap: 16px;
}

.v-chip {
  font-size: 0.7rem;
}

.v-btn {
  font-size: 0.8rem;
}

.add-tarefa-btn {
  margin-top: 36px; /* Ajustado para alinhar com o botão Salvar Chamado */
}
</style>
