<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="8" lg="6">
                <v-card>
                    <v-card-title class="text-h5">Criar Novo Chamado</v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="criarChamado">
                            <!-- Campos de Título e Descrição -->
                            <v-text-field
                                v-model="titulo"
                                label="Título"
                                required
                            ></v-text-field>

                            <v-textarea
                                v-model="descricao"
                                label="Descrição"
                                required
                            ></v-textarea>

                            <!-- Campo Solicitado Por -->
                            <v-text-field
                                v-model="solicitadoPor"
                                label="Solicitado Por"
                                required
                            ></v-text-field>

                            <!-- Campo Categoria -->
                            <v-select
                                v-model="categoriaSelecionada"
                                :items="categoriasFormatadas"
                                label="Categoria"
                                required
                            ></v-select>

                            <!-- Botão de Salvar -->
                            <v-btn color="primary" type="submit">Criar Chamado</v-btn>
                            <v-btn color="secondary" @click="cancelar">Cancelar</v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import api from "../services/api";

export default {
  name: "NovoChamado",
  data() {
    return {
      titulo: "",
      descricao: "",
      solicitadoPor: "",
      status: "Aberto",
      protocolo: "",
      categoriaSelecionada: "", // Nome da categoria selecionada
      categoriasFormatadas: [], // Lista de nomes de categorias
      categoriaIdMap: {}, // Mapa de categoria para ID
    };
  },
  async created() {
    try {
      const response = await api.get("/categorias");
      if (response.data && Array.isArray(response.data)) {
        this.categoriasFormatadas = response.data.map(categoria => categoria.nome);
        this.categoriaIdMap = response.data.reduce((map, categoria) => {
          map[categoria.nome] = categoria.id;
          return map;
        }, {});
        console.log("Categorias formatadas para exibição:", this.categoriasFormatadas);
        console.log("Mapa de IDs das categorias:", this.categoriaIdMap);
      }
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
    }
  },
    methods: {
        async criarChamado() {
            this.protocolo = Math.random().toString(36).substr(2, 5).toUpperCase();

            const novoChamado = {
                titulo: this.titulo,
                descricao: this.descricao,
                status: "Aberto",
                solicitadoPor: this.solicitadoPor,
                protocolo: this.protocolo,
                categoriaId: this.categoriaIdMap[this.categoriaSelecionada], // Obtém o ID da categoria
            };

            console.log("Dados do novo chamado a serem enviados:", novoChamado); // Verifica os dados antes de enviar

            try {
                await api.post("/chamados", novoChamado);
                alert("Chamado criado com sucesso!");
                this.$router.push("/");
            } catch (error) {
                console.error("Erro ao criar o chamado:", error);
                alert("Erro ao criar o chamado.");
            }
        },
    },
};
</script>

<style scoped>
.v-card {
  margin-bottom: 20px;
}
</style>
