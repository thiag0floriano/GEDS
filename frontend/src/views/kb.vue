<template>
    <v-container>
      <v-row dense>
        <!-- Componente Editar Chamado -->
        <v-col cols="12" md="6">
          <EditarChamado
            :chamadoId="chamadoId"
            :titulo="titulo"
            :descricao="descricao"
            :status="status"
            :dataAbertura="data_abertura"
            :dataFechamento="data_fechamento"
            :statusOptions="statusOptions"
            @salvarChamado="salvarChamado"
            @cancelarEdicao="cancelarEdicao"
            @update:dataFechamento="(value) => (data_fechamento = value)"
          />
        </v-col>
  
        <!-- Componente Tarefas do Chamado -->
        <v-col cols="12" md="6">
          <TarefasChamado
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
        <v-col cols="12" md="6">
          <ComunicacaoInterna
            :mensagens="mensagens"
            v-model:novaMensagem="novaMensagem"
            @enviarMensagem="enviarMensagem"
          />
        </v-col>
  
        <!-- Componente Histórico de Atividades -->
        <v-col cols="12" md="6">
          <HistoricoAtividades :historicoAtividades="historicoAtividades" />
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
        if (this.status === "Fechado") {
          this.data_fechamento = new Date().toISOString().slice(0, 16); // Define data atual
        } else {
          this.data_fechamento = ""; // Remove a data de fechamento
        }
      },
      // async salvarChamado() {
      //   const chamadoData = {
      //     titulo: this.titulo,
      //     descricao: this.descricao,
      //     status: this.status,
      //     data_abertura: this.data_abertura,
      //     data_fechamento: this.status === "Fechado" ? this.data_fechamento : null,
      //   };
      //   try {
      //     if (this.chamadoId) {
      //       await api.put(`/chamados/${this.chamadoId}`, chamadoData);
      //       alert("Chamado atualizado com sucesso");
      //     } else {
      //       await api.post("/chamados", chamadoData);
      //       alert("Chamado criado com sucesso");
      //     }
      //     this.$router.push("/");
      //   } catch (error) {
      //     console.error("Erro ao salvar chamado:", error);
      //     alert("Erro ao salvar chamado");
      //   }
      // },
  
      async salvarChamado(dadosChamado) {
        this.titulo = dadosChamado.titulo;
        this.descricao = dadosChamado.descricao;
        this.status = dadosChamado.status;
        this.data_abertura = dadosChamado.dataAbertura;
        this.data_fechamento = dadosChamado.dataFechamento;
  
        const chamadoData = {
          titulo: this.titulo,
          descricao: this.descricao,
          status: this.status,
          data_abertura: this.data_abertura,
          data_fechamento: this.status === "Fechado" ? this.data_fechamento : null,
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
  
          // Verifique o objeto novaTarefa antes de enviar
          console.log("Nova Tarefa:", novaTarefa);
  
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
            // Armazenamos um mapeamento de usuários para IDs
            this.usuarioIdMap = response.data.reduce((map, usuario) => {
              map[usuario.username] = usuario.id;
              return map;
            }, {});
          }
        } catch (error) {
          console.error("Erro ao carregar usuários:", error);
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
      await this.carregarUsuarios();
      this.chamadoId = this.$route.params.id;
      await this.carregarChamado();
      await this.carregarTarefas();
      await this.carregarMensagens();
      await this.carregarHistorico();
    },
  };
  </script>
  
  <style scoped>
  .v-card {
    margin-bottom: 20px;
  }
  </style>
  


  <!-- EditarChamado.vue -->
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
          this.localDataFechamento = agora.toISOString();
          this.$emit("update:dataFechamento", this.localDataFechamento);
        } else {
          this.localDataFechamento = "";
          this.$emit("update:dataFechamento", "");
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
  