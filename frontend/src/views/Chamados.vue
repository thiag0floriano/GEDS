<template>
  <v-container>
    <v-row dense>
      <!-- Editar Chamado e Tarefas do Chamado lado a lado -->
      <!-- Editar ou Criar Chamado -->
      <v-col cols="12" md="6">
        <v-card outlined>
          <v-card-title>{{ chamadoId ? "Editar Chamado" : "Criar Chamado" }}</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="salvarChamado">
              <v-text-field label="Título" v-model="titulo" required></v-text-field>
              <v-textarea label="Descrição" v-model="descricao" required></v-textarea>

              <!-- Seletor de Status para edição do chamado -->
              <v-select
                v-if="chamadoId"
                label="Status"
                v-model="status"
                :items="statusOptions"
                @change="atualizarDataFechamento"
                required
              ></v-select>

              <!-- Data de Abertura e Fechamento (somente em edição) -->
              <v-text-field
                label="Data de Abertura"
                v-model="data_abertura"
                readonly
                v-if="chamadoId"
                outlined
              ></v-text-field>
              <v-text-field
                label="Data de Fechamento"
                v-model="data_fechamento"
                readonly
                v-if="chamadoId && data_fechamento"
                outlined
              ></v-text-field>

              <v-btn color="primary" type="submit">
                {{ chamadoId ? "Salvar" : "Criar" }} Chamado
              </v-btn>
              <v-btn color="secondary" @click="cancelarEdicao">Cancelar</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
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
            
            <v-form @submit.prevent="adicionarTarefa" ref="form">
              <v-text-field
                label="Título"
                v-model="tituloTarefa"
                :rules="[v => !!v || 'Título é obrigatório']"
                required
              ></v-text-field>
              <v-textarea
                label="Descrição"
                v-model="descricaoTarefa"
                :rules="[v => !!v || 'Descrição é obrigatória']"
                rows="2"
                required
              ></v-textarea>
              <v-select
                label="Atribuir a"
                v-model="usuarioIdTarefa"
                :items="usuarios"
                item-text="username"
                item-value="id"
                required
              ></v-select>
              <v-btn color="primary" type="submit" class="mt-3" :disabled="!formValid">
                Adicionar Tarefa
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row dense>
      <!-- Comunicação Interna e Histórico de Atividades lado a lado -->
      <v-col cols="12" md="6">
        <v-card outlined>
          <v-card-title>Comunicação Interna</v-card-title>
          <v-card-text>
            <div v-if="mensagens.length">
              <v-list>
                <v-list-item v-for="mensagem in mensagens" :key="mensagem.id">
                  <v-list-item-content>
                    <v-list-item-title>
                      <strong>{{ mensagem.User ? mensagem.User.username : 'Usuário desconhecido' }}:</strong>
                    </v-list-item-title>
                    <v-list-item-subtitle>{{ mensagem.conteudo }}</v-list-item-subtitle>
                    <small>{{ new Date(mensagem.data_envio).toLocaleString() }}</small>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </div>
            <div v-else>Sem mensagens ainda.</div>

            <v-text-field
              v-model="novaMensagem"
              label="Digite uma mensagem..."
              @keyup.enter="enviarMensagem"
            ></v-text-field>
            <v-btn color="primary" @click="enviarMensagem">Enviar</v-btn>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "../services/api";

export default {
  name: "ChamadosPage",
  data() {
    return {
      chamadoId: null,
      titulo: "",
      descricao: "",
      status: "Aberto",
      data_abertura: "",
      data_fechamento: "",
      tituloTarefa: "",
      descricaoTarefa: "",
      usuarioIdTarefa: null,
      tarefas: [],
      usuarios: [],
      mensagens: [],
      novaMensagem: "",
      historicoAtividades: [],
      statusOptions: ['Aberto', 'Pendente', 'Espera', 'Fechado'],
    };
  },
  methods: {
    async carregarMensagens() {
      if (!this.chamadoId) return;
      try {
        const response = await api.get(`/mensagens/${this.chamadoId}`);
        this.mensagens = response.data;
      } catch (error) {
        console.error("Erro ao carregar mensagens:", error);
      }
    },
    async enviarMensagem() {
      if (this.novaMensagem.trim() === "") return;
      try {
        const response = await api.post(`/mensagens/${this.chamadoId}`, {
          conteudo: this.novaMensagem,
        });
        this.mensagens.push(response.data);
        this.novaMensagem = "";
      } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
      }
    },
    async carregarChamado() {
      if (this.chamadoId) {
        try {
          const response = await api.get(`/chamados/${this.chamadoId}`);
          const chamado = response.data;
          this.titulo = chamado.titulo;
          this.descricao = chamado.descricao;
          this.status = chamado.status;
          this.data_abertura = chamado.data_abertura
            ? chamado.data_abertura.slice(0, 16)
            : "";
          this.data_fechamento = chamado.data_fechamento
            ? chamado.data_fechamento.slice(0, 16)
            : "";
          this.tarefas = chamado.tarefas || [];
        } catch (error) {
          console.error("Erro ao carregar chamado:", error);
          alert("Erro ao carregar chamado");
        }
      }
    },
    atualizarDataFechamento() {
      if (this.status === 'Fechado') {
        this.data_fechamento = new Date().toISOString().slice(0, 16); // Define data atual
      } else {
        this.data_fechamento = ''; // Remove a data de fechamento
      }
    },
    async salvarChamado() {
      const chamadoData = {
        titulo: this.titulo,
        descricao: this.descricao,
        status: this.status,
        //status: this.chamadoId ? this.status : 'Aberto',
        data_abertura: this.data_abertura,
        data_fechamento: this.status === 'Fechado' ? this.data_fechamento : null,
      };
      try {
        if (this.chamadoId) {
          await api.put(`/chamados/${this.chamadoId}`, chamadoData);
          alert("Chamado atualizado com sucesso");
        } else {
          await api.post("/chamados", chamadoData);
          alert("Chamado criado com sucesso");
        }
        this.$router.push("/");
      } catch (error) {
        console.error("Erro ao salvar chamado:", error);
        alert("Erro ao salvar chamado");
      }
    },
    cancelarEdicao() {
      this.$router.push("/");
    },
    async carregarTarefas() {
      if (this.chamadoId) {
        try {
          const response = await api.get(`/chamados/${this.chamadoId}/tarefas`);
          this.tarefas = response.data;
        } catch (error) {
          console.error("Erro ao carregar tarefas:", error);
        }
      } else {
        this.tarefas = [];
      }
    },
    async adicionarTarefa() {
      try {
        const novaTarefa = {
          titulo: this.tituloTarefa,
          descricao: this.descricaoTarefa,
          status: "pendente",
          usuarioId: this.usuarioIdTarefa,
        };
        await api.post(`/chamados/${this.chamadoId}/tarefas`, novaTarefa);
        this.tituloTarefa = "";
        this.descricaoTarefa = "";
        this.usuarioIdTarefa = "";
        this.carregarTarefas();
      } catch (error) {
        console.error("Erro ao adicionar tarefa:", error);
      }
    },
    async excluirTarefa(tarefaId) {
      try {
        await api.delete(`/chamados/tarefas/${tarefaId}`);
        this.carregarTarefas();
      } catch (error) {
        console.error("Erro ao excluir tarefa:", error);
      }
    },
    async carregarUsuarios() {
      try {
        const response = await api.get("/usuarios");
        if (response.data && Array.isArray(response.data)) {
          this.usuarios = response.data;
          console.log("Usuários carregados:", this.usuarios); // Adicione esta linha
        }
      } catch (error) {
        console.error("Erro ao carregar usuários:", error);
      }
    },
    async carregarHistorico() {
      if (!this.chamadoId) return;
      try {
        const response = await api.get(`/chamados/${this.chamadoId}/historico`);
        this.historicoAtividades = response.data;
      } catch (error) {
        console.error("Erro ao carregar histórico de atividades:", error);
      }
    },
  },
  async mounted() {
    this.chamadoId = this.$route.params.id;
    await this.carregarUsuarios();
    await this.carregarChamado();
    await this.carregarTarefas();
    await this.carregarMensagens();
    await this.carregarHistorico();
    console.log(this.usuarios);
  },
};
</script>

<style scoped>
.v-card {
  margin-bottom: 20px;
}
</style>
