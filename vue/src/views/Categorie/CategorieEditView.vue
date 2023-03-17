<template>
  <v-container>
    <v-form>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>
              <h1 class="display-1">Modifier une catégorie</h1>
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
                <v-btn color="blue darken-1" text @click="editCategorie">Modifier</v-btn>
              </v-card-actions>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import {get, put} from "@/services/axios.service.js";
export default {
  name: "CategorieEditView",
  data: () => ({
    categorie: {
      libelle: null,
      couleur: "#000000"
    }
  }),
  methods: {
    async getCategorie() {
      await get("categorie/" + this.$route.params.id)
          .then(response => {
            this.categorie = response.data.data;
          })
          .catch(error => {
            console.log(error);
          });
    },
    async editCategorie() {
      put("categorie/" + this.$route.params.id, this.categorie)
          .then(() => {
            this.$store.dispatch('getCategories');
            this.$store.dispatch('getArtistes');
            this.$router.push("/categorie");
          })
          .catch(error => {
            alert(error.response.data.message);
          });
    }
  },
  created() {
    this.getCategorie();
  },

}
</script>

<style scoped>

</style>