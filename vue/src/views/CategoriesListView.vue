<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="4" md="4">
        <v-text-field
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            label="Rechercher"
            outlined
            hide-details></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-btn
          class="ma-6 addDeleteBtn"
          :height="56"
          :href="'/categorie/add'"
          color="success">Ajouter genre&emsp;<v-icon>mdi-plus-box-outline</v-icon>
      </v-btn>
      <v-btn
          class="ma-6 addDeleteBtn"
          :height="56"
          color="error"
          @click="deleteAll()">Tout supprimer&emsp;<v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-row>

    <v-row class="table-center">
      <table class="listing">
        <thead>
        <tr>
          <th>Nom catégorie</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="categorie in filter" :key="categorie.id">
          <td>{{categorie.libelle}}</td>
          <td>
            <v-btn class="ma-1" color="primary" :href="'/categorie/' + categorie.id + '/edit'"><v-icon>mdi-pencil</v-icon></v-btn>
            <v-btn class="ma-1" color="error" @click="deleteCategorie(categorie.id)"><v-icon>mdi-delete</v-icon></v-btn>
          </td>
        </tr>
        </tbody>
      </table>
    </v-row>
  </v-container>
</template>

<script>
import Vue from "vue";
export default {
  name: "CategoriesListView",
  data: () => ({
    categories: [],
    search: "",
  }),
  methods: {
    async getCategories() {
      return await Vue.axios.get("http://localhost:3000/categorie")
          .then(response => {
            this.categories = response.data
          })
          .catch(error => {
            console.log(error)
          });
    },
    async deleteCategorie(id) {
      return await Vue.axios.delete("http://localhost:3000/categorie/" + id)
          .catch(error => {
            console.log(error)
          });
    },
    async deleteAll() {
      if (confirm("Voulez-vous vraiment supprimer toutes les catégories ?")) {
        return await Vue.axios.delete("http://localhost:3000/categorie")
            .catch(error => {
              console.log(error)
            });
      }
    },
  },
  computed: {
    filter() {
      return this.categories.filter(categorie => {
        return categorie.libelle.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  updated() {
    this.getCategories();
  },
  created() {
    this.getCategories()
  }
}
</script>

<style scoped>
@import '../../public/css/show.css';
</style>