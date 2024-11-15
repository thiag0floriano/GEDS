<template>
  <v-container>
    <v-row dense>
      <!-- Componente Editar Chamado -->
      <v-col cols="12" md="8">
        <EditarChamado
          :chamadoId="chamadoId"
          :titulo="titulo"
          :descricao="descricao"
          :status="status"
          :dataAbertura="data_abertura ? data_abertura.toString() : ''"
          :dataFechamento="data_fechamento ? data_fechamento.toString() : ''"
          :abertoPor="abertoPor ? abertoPor.toString() : ''"
          :solicitadoPor="solicitadoPor ? solicitadoPor.toString() : ''"
          :protocolo="protocolo ? protocolo.toString() : ''"
          :statusOptions="statusOptions"
          @salvarChamado="salvarChamado"
          @cancelarEdicao="cancelarEdicao"
          @update:dataFechamento="(value) => (data_fechamento = value)"
        />
      </v-col>

      <!-- Componente Tarefas do Chamado -->
      <v-col cols="12" md="4" class="d-flex">
        <TarefasChamado
          class="tarefas-container flex-grow-1"
          :tarefas="tarefas"
          :usuariosFormatados="usuariosFormatados"
          v-model:tituloTarefa="tituloTarefa"
          v-model:descricaoTarefa="descricaoTarefa"
          v-model:usuarioIdTarefa="usuarioIdTarefa"
          @adicionarTarefa="adicionarTarefa"
          @excluirTarefa="excluirTarefa"
        />
      </v-col>
    </v-row>

    <v-row dense>
      <!-- Componente Comunicação Interna -->
      <v-col cols="12" md="6" class="d-flex">
        <ComunicacaoInterna
          class="comunicacao-interna flex-grow-1"
          :mensagens="mensagens"
          :usuarioAtual="usuarioAtual"
          v-model:novaMensagem="novaMensagem"
          @enviarMensagem="enviarMensagem"
        />
      </v-col>

      <!-- Componente Histórico de Atividades -->
      <v-col cols="12" md="6" class="d-flex">
        <HistoricoAtividades
          class="historico-atividades flex-grow-1"
          :historicoAtividades="historicoAtividades"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "../services/api";
import EditarChamado from "@/components/EditarChamado.vue";
import TarefasChamado from "@/components/TarefasChamado.vue";
import ComunicacaoInterna from "@/components/ComunicacaoInterna.vue";
import HistoricoAtividades from "@/components/HistoricoAtividades.vue";

export default {
  name: "ChamadosPage",
  components: {
    EditarChamado,
    TarefasChamado,
    ComunicacaoInterna,
    HistoricoAtividades,
  },
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
      usuariosFormatados: [],
      mensagens: [],
      novaMensagem: "",
      historicoAtividades: [],
      statusOptions: ["Aberto", "Pendente", "Espera", "Fechado"],
      usuarioAtual: "",
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
    async enviarMensagem(mensagem) {
    if (!mensagem) return; // Verifica se há conteúdo
      try {
        const response = await api.post(`/mensagens/${this.chamadoId}`, {
          conteudo: mensagem,
        });
        this.mensagens.push(response.data); // Adiciona a nova mensagem à lista
        this.novaMensagem = ""; // Limpa o campo de nova mensagem
      } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
      }
    },
    async carregarChamado() {
      if (this.chamadoId) {
        try {
          const response = await api.get(`/chamados/${this.chamadoId}`);
          const chamado = response.data;
          console.log("Dados do chamado após carregar:", chamado);
          
          // Ajuste para corrigir fuso horário para exibição
          const ajustarFusoHorario = (data) => {
            if (!data) return "";
            const date = new Date(data);
            date.setHours(date.getHours() - 3); // Subtrai 3 horas para ajustar o fuso
            return date.toISOString().slice(0, 16);
          };

          this.titulo = chamado.titulo;
          this.descricao = chamado.descricao;
          this.status = chamado.status;
          this.data_abertura = ajustarFusoHorario(chamado.data_abertura);
          this.data_fechamento = ajustarFusoHorario(chamado.data_fechamento);
          this.abertoPor = chamado.abertoPor ? chamado.abertoPor.toString() : "";
          this.solicitadoPor = chamado.solicitadoPor ? chamado.solicitadoPor.toString() : "";
          this.protocolo = chamado.protocolo ? chamado.protocolo.toString() : "";
          this.tarefas = chamado.tarefas || [];
        } catch (error) {
          console.error("Erro ao carregar chamado:", error);
          alert("Erro ao carregar chamado");
        }
      }
    },
    async salvarChamado(dadosChamado) {
      this.titulo = dadosChamado.titulo;
      this.descricao = dadosChamado.descricao;
      this.status = dadosChamado.status;
      this.data_abertura = dadosChamado.dataAbertura;
      this.data_fechamento = this.status === "Fechado" ? dadosChamado.dataFechamento || new Date().toISOString() : null;

      const chamadoData = {
        titulo: this.titulo,
        descricao: this.descricao,
        status: this.status,
        data_abertura: this.data_abertura,
        data_fechamento: this.data_fechamento,
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
        // Verifique se os campos necessários estão preenchidos
        if (!this.tituloTarefa || !this.descricaoTarefa || !this.usuarioIdTarefa) {
          console.error("Por favor, preencha todos os campos da tarefa.");
          return;
        }

        const novaTarefa = {
          titulo: this.tituloTarefa,
          descricao: this.descricaoTarefa,
          status: "pendente",
          usuarioId: this.usuarioIdMap[this.usuarioIdTarefa] // Obtenha o ID do mapeamento
        };

        await api.post(`/chamados/${this.chamadoId}/tarefas`, novaTarefa);

        // Limpar os campos após adicionar a tarefa
        this.tituloTarefa = "";
        this.descricaoTarefa = "";
        this.usuarioIdTarefa = null;

        // Recarregar as tarefas
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
          this.usuariosFormatados = response.data.map(usuario => usuario.username);
          this.usuarioIdMap = response.data.reduce((map, usuario) => {
            map[usuario.username] = usuario.id;
            return map;
          }, {});
        }
      } catch (error) {
        console.error("Erro ao carregar usuários:", error);
      }
    },
    async carregarUsuarioAtual() {
      try {
        const response = await api.get('/usuarios/me'); // Rota para obter os dados do usuário logado
        this.usuarioAtual = response.data.username; // Ajuste o campo conforme sua estrutura de usuário
        console.log("Usuário atual:", this.usuarioAtual);
      } catch (error) {
        console.error("Erro ao carregar usuário atual:", error);
      }
    },
    async carregarHistorico() {
      if (!this.chamadoId) return;
      try {
        const response = await api.get(
          `/chamados/${this.chamadoId}/historico`
        );
        this.historicoAtividades = response.data;
      } catch (error) {
        console.error("Erro ao carregar histórico de atividades:", error);
      }
    },
  },

  async mounted() {
    await this.carregarUsuarioAtual();
    await this.carregarUsuarios();
    this.chamadoId = this.$route.params.id;
    await this.carregarChamado();
    await this.carregarTarefas();
    await this.carregarMensagens();
    await this.carregarHistorico();
  },
  watch: {
    titulo(newVal) {
      this.titulo = newVal;
    },
    descricao(newVal) {
      this.descricao = newVal;
    },
    status(newVal) {
      this.status = newVal;
    },
    data_abertura(newVal) {
      this.data_abertura = newVal;
    },
    data_fechamento(newVal) {
      this.data_fechamento = newVal;
    },
    abertoPor(newVal) {
      this.abertoPor = newVal;
    },
    solicitadoPor(newVal) {
      this.solicitadoPor = newVal;
    },
    protocolo(newVal) {
      this.protocolo = newVal;
    }
  },
};
</script>

<style scoped>
.comunicacao-interna,
.historico-atividades {
  height: 400px; /* Define uma altura fixa */
}

.v-card {
  margin-bottom: 20px;
}

.tarefas-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 97%; /* Ajusta a altura para coincidir com o card */
}
</style>