<template>
  <v-container>
    <v-form>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>
              <h1 class="display-1">Modifier un genre</h1>
            </v-card-title>
            <v-card-text>
              <v-text-field
                  v-model="genre.libelle"
                  label="Nom du genre"
                  required
              ></v-text-field>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="editGenre">Modifier</v-btn>
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
  name: "GenreEditView",
  data: () => ({
    genre: {
      id: null,
      libelle: null,
    },
  }),
  methods: {
    async getGenre() {
      await get("genre/" + this.$route.params.id)
          .then(response => {
            this.genre = {
              id: response.data.data.id,
              libelle: response.data.data.libelle,
            };
          })
          .catch(error => {
            console.log(error)
          });
    },
    async editGenre() {
      put("genre/" + this.$route.params.id, this.genre)
          .then(() => {
            this.$store.dispatch('getGenres');
            this.$store.dispatch('getArtistes');
            this.$router.push('/genre');
          })
          .catch(error => {
            alert(error.response.data.message);
          });
    },
  },
  created() {
    this.getGenre();
  },

}
</script>

<style scoped>
@import '@/../public/css/show.css';
</style>