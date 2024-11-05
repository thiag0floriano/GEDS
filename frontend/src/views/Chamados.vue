<!-- <template>
  <div>
    <h1>Criar Chamado</h1>
    <form @submit.prevent="createChamado">
      <div>
        <label for="titulo">Título:</label>
        <input type="text" id="titulo" v-model="titulo" required>
      </div>
      <div>
        <label for="descricao">Descrição:</label>
        <textarea id="descricao" v-model="descricao" required></textarea>
      </div>
      <div>
        <label for="status">Status:</label>
        <input type="text" id="status" v-model="status" required>
      </div>
      <div>
        <label for="datadata_aberturabertura">Data de Abertura:</label>
        <input type="datetime-local" id="datadata_aberturabertura" v-model="datadata_aberturabertura" required>
      </div>
      <div>
        <label for="usuarioId">ID do Usuário:</label>
        <input type="number" id="usuarioId" v-model="usuarioId" required>
      </div>
      <button type="submit">Criar Chamado</button>
    </form>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  name: 'ChamadosPage',
  data() {
    return {
      titulo: '',
      descricao: '',
      status: '',
      datadata_aberturabertura: '',
      usuarioId: ''
    };
  },
  methods: {
    async createChamado() {
      try {
        const newChamado = {
          titulo: this.titulo,
          descricao: this.descricao,
          status: this.status,
          datadata_aberturabertura: new Date(this.datadata_aberturabertura).toISOString(),
          usuarioId: this.usuarioId
        };
        await api.post('/chamados', newChamado);
        this.titulo = '';
        this.descricao = '';
        this.status = '';
        this.datadata_aberturabertura = '';
        this.usuarioId = '';
        alert('Chamado criado com sucesso!');
      } catch (error) {
        console.error('Error creating chamado:', error);
        alert('Erro ao criar chamado.');
      }
    },
  },
};
</script> -->

<!-- <template>
  <div>
    <h1>Atualizar Chamado</h1>
    <form @submit.prevent="updateChamado">
      <div>
        <label for="id">ID do Chamado:</label>
        <input type="number" id="id" v-model="id" required>
      </div>
      <div>
        <label for="titulo">Título:</label>
        <input type="text" id="titulo" v-model="titulo" required>
      </div>
      <div>
        <label for="descricao">Descrição:</label>
        <textarea id="descricao" v-model="descricao" required></textarea>
      </div>
      <div>
        <label for="status">Status:</label>
        <input type="text" id="status" v-model="status" required>
      </div>
      <div>
        <label for="datadata_aberturabertura">Data de Abertura:</label>
        <input type="datetime-local" id="datadata_aberturabertura" v-model="datadata_aberturabertura" required>
      </div>
      <div>
        <label for="usuarioId">ID do Usuário:</label>
        <input type="number" id="usuarioId" v-model="usuarioId" required>
      </div>
      <button type="submit">Atualizar Chamado</button>
    </form>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  name: 'ChamadosPage',
  data() {
    return {
      id: '',
      titulo: '',
      descricao: '',
      status: '',
      datadata_aberturabertura: '',
      usuarioId: ''
    };
  },
  methods: {
    async updateChamado() {
      try {
        const updatedChamado = {
          titulo: this.titulo,
          descricao: this.descricao,
          status: this.status,
          datadata_aberturabertura: new Date(this.datadata_aberturabertura).toISOString(),
          usuarioId: this.usuarioId
        };
        await api.put(`/chamados/${this.id}`, updatedChamado);
        this.id = '';
        this.titulo = '';
        this.descricao = '';
        this.status = '';
        this.datadata_aberturabertura = '';
        this.usuarioId = '';
        alert('Chamado atualizado com sucesso!');
      } catch (error) {
        console.error('Erro ao atualizar chamado:', error);
        alert('Erro ao atualizar chamado.');
      }
    },
  },
};
</script> -->

<template>
  <div>
    <h1>{{ chamadoId ? 'Editar Chamado' : 'Criar Chamado' }}</h1>
    <form @submit.prevent="salvarChamado">
      <div>
        <label for="titulo">Título:</label>
        <input type="text" id="titulo" v-model="titulo" required />
      </div>
      <div>
        <label for="descricao">Descrição:</label>
        <textarea id="descricao" v-model="descricao" required></textarea>
      </div>
      <div>
        <label for="status">Status:</label>
        <input type="text" id="status" v-model="status" required />
      </div>
      <div v-if="chamadoId">
        <label for="data_abertura">Data de Abertura:</label>
        <input type="datetime-local" id="data_abertura" v-model="data_abertura" disabled />
      </div>
      <div v-if="chamadoId">
        <label for="data_fechamento">Data de Fechamento:</label>
        <input type="datetime-local" id="data_fechamento" v-model="data_fechamento" />
      </div>
      <button type="submit">{{ chamadoId ? 'Salvar' : 'Criar' }} Chamado</button>
      <button type="button" @click="cancelarEdicao">Cancelar</button>
    </form>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  name: 'ChamadosPage',
  data() {
    return {
      chamadoId: null,
      titulo: '',
      descricao: '',
      status: '',
      data_abertura: '',
      data_fechamento: '',
    };
  },
  methods: {
    async carregarChamado() {
      if (this.chamadoId) {
        try {
          const response = await api.get(`/chamados/${this.chamadoId}`);
          const chamado = response.data;
          this.titulo = chamado.titulo;
          this.descricao = chamado.descricao;
          this.status = chamado.status;
          this.data_abertura = chamado.data_abertura;
          this.data_fechamento = chamado.data_fechamento;
        } catch (error) {
          console.error('Erro ao carregar chamado:', error);
          alert('Erro ao carregar chamado');
        }
      }
    },
    async salvarChamado() {
      const chamadoData = {
        titulo: this.titulo,
        descricao: this.descricao,
        status: this.status,
        data_abertura: this.data_abertura,
        data_fechamento: this.data_fechamento,
      };
      try {
        if (this.chamadoId) {
          // Atualizar chamado existente
          await api.put(`/chamados/${this.chamadoId}`, chamadoData);
          alert('Chamado atualizado com sucesso');
        } else {
          // Criar novo chamado
          await api.post('/chamados', chamadoData);
          alert('Chamado criado com sucesso');
        }
        this.$router.push('/');
      } catch (error) {
        console.error('Erro ao salvar chamado:', error);
        alert('Erro ao salvar chamado');
      }
    },
    cancelarEdicao() {
      this.$router.push('/');
    },
  },
  async mounted() {
    this.chamadoId = this.$route.params.id;
    await this.carregarChamado();
  },
};
</script>

