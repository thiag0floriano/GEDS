<template>
    <v-card outlined>
      <v-card-title class="text-h6 font-weight-bold">Tarefas do Chamado</v-card-title>
      <v-card-text>
        <div v-if="tarefas.length">
          <v-list>
            <v-list-item
              v-for="tarefa in tarefas"
              :key="tarefa.id"
              class="tarefa-item"
            >
              <v-list-item-content>
                <v-list-item-title class="font-weight-medium">{{ tarefa.titulo }}</v-list-item-title>
                <v-list-item-subtitle>Status: {{ tarefa.status }}</v-list-item-subtitle>
                <v-list-item-subtitle>{{ tarefa.descricao }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn color="error" @click="excluirTarefa(tarefa.id)" text>
                  Excluir
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </div>
        <div v-else class="text-center my-4">Este chamado ainda não possui tarefas.</div>
  
        <v-divider class="my-4"></v-divider>
        <v-card-subtitle class="text-h6 font-weight-bold mb-3">Adicionar Tarefa</v-card-subtitle>
        
        <v-form @submit.prevent="adicionarTarefa">
          <v-text-field
            label="Título"
            v-model="localTituloTarefa"
            :rules="[v => !!v || 'Título é obrigatório']"
            required
          ></v-text-field>

          <v-textarea
            label="Descrição"
            v-model="localDescricaoTarefa"
            :rules="[v => !!v || 'Descrição é obrigatório']"
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

          <v-btn color="primary" type="submit" class="mt-3">
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
    emits: ["adicionar-tarefa", "excluir-tarefa", "update:tituloTarefa", "update:descricaoTarefa", "update:usuarioIdTarefa"],
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

  