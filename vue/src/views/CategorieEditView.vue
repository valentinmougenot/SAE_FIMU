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
            color="primary"
            :height="56"
            class="addDeleteBtn"
            @click="editCategorie()">Modifier
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "CategorieEditView",
  data: () => ({
    categorie: {
      libelle: null
    }
  }),
  methods: {
    async getCategorie() {
      return await axios.get("http://localhost:3000/categorie/" + this.$route.params.id)
          .then(response => {
            this.categorie = response.data;
          })
          .catch(error => {
            console.log(error);
          });
    },
    async editCategorie() {
      return await axios.put("http://localhost:3000/categorie/" + this.$route.params.id, this.categorie)
          .then(() => {
            this.$router.push("/categorie");
          })
          .catch(error => {
            console.log(error);
          });
    }
  },
  created() {
    this.getCategorie();
  }
}
</script>

<style scoped>

</style>