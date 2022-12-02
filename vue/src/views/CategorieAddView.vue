<template>
  <v-container>
    <v-form>
      <v-row>
        <v-col cols = "12">
          <v-card>
            <v-card-title>
              <h1 class="display-1">Ajouter une catégorie</h1>
            </v-card-title>
            <v-card-text>
              <v-text-field
                  v-model="categorie.libelle"
                  label="Nom de la categorie"
                  required
              ></v-text-field>
              <v-btn
                  color="success"
                  :height="56"
                  class="addDeleteBtn"
                  @click="addCategorie()">Ajouter
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
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
  },
  beforeCreate() {
    if (!this.$session.exists()) {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
@import '../../public/css/show.css';
</style>