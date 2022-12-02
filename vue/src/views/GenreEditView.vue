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
              <v-btn
                  color="primary"
                  :height="56"
                  class="addDeleteBtn"
                  @click="editGenre()">Modifier
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
  name: "GenreEditView",
  data: () => ({
    genre: {
      id: null,
      libelle: null,
    },
  }),
  methods: {
    async getGenre() {
      return await Vue.axios.get("http://localhost:3000/genre/" + this.$route.params.id)
          .then(response => {
            console.log(response.data);
            this.genre = {
              id: response.data.id,
              libelle: response.data.libelle,
            };
          })
          .catch(error => {
            console.log(error)
          });
    },
    async editGenre() {
      return await Vue.axios.put("http://localhost:3000/genre/" + this.$route.params.id, this.genre)
          .then(() => {
            this.$router.push('/genre');
          })
          .catch(error => {
            console.log(error)
          });
    },
  },
  created() {
    this.getGenre();
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