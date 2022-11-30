<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="4" md="4">
        <v-text-field
            v-model="categorie.libelle"
            label="Nom de la categorie"
            outlined
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="4" md="4">
        <v-btn
            color="success"
            :height="56"
            class="addDeleteBtn"
            @click="addCategorie()">Ajouter
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from "vue";
export default {
  name: "CategorieAddView",
  data: () => ({
    categorie: {
      libelle: null
    }
  }),
  methods: {
    async addCategorie() {
      return await Vue.axios.post("http://localhost:3000/categorie", this.categorie)
          .then(() => {
            this.$router.push("/categorie");
          })
          .catch(error => {
            console.log(error);
          });
    }
  }
}
</script>

<style scoped>
@import '../../public/css/show.css';
</style>