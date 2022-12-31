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
              <v-color-picker
                  v-model="categorie.couleur"
                  label="Couleur de la catégorie"
                  required
              ></v-color-picker>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="addCategorie">Ajouter</v-btn>
              </v-card-actions>
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
      libelle: null,
      couleur: "#000000"
    }
  }),
  methods: {
    async addCategorie() {
      return await Vue.axios.post("http://localhost:3000/categorie", this.categorie)
          .then(() => {
            this.$store.dispatch('getCategories');
            this.$store.dispatch('getArtistes');
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