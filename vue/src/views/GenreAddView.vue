<template>
  <v-container>
    <v-form>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>
              <h1 class="display-1">Ajouter un genre</h1>
            </v-card-title>
            <v-card-text>
              <v-text-field
                  v-model="genre.libelle"
                  label="Nom du genre"
                  required
              ></v-text-field>
              <v-btn
                  color="success"
                  :height="56"
                  class="addDeleteBtn"
                  @click="addGenre()">Ajouter
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