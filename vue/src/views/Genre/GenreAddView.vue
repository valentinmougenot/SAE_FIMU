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
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="addGenre">Ajouter</v-btn>
              </v-card-actions>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import {post} from "@/services/axios.service.js";
export default {
  name: "GenreAddView",
  data: () => ({
    genre: {
      libelle: null
    }
  }),
  methods: {
    async addGenre() {
      post("genre", this.genre)
          .then(() => {
            this.$store.dispatch('getGenres');
            this.$store.dispatch('getArtistes');
            this.$router.push("/genre");
          })
          .catch(error => {
            alert(error.response.data.message);
          });
    }
  },

}
</script>

<style scoped>
@import '@/../public/css/show.css';
</style>