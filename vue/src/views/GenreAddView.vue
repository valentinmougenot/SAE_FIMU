<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="4" md="4">
        <v-text-field
            v-model="genre.libelle"
            label="Nom du genre"
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
            @click="addGenre()">Ajouter
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from "vue";
export default {
  name: "GenreAddView",
  data: () => ({
    genre: {
      libelle: null
    }
  }),
  methods: {
    async addGenre() {
      return await Vue.axios.post("http://localhost:3000/genre", this.genre)
          .then(() => {
            this.$router.push("/genre");
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