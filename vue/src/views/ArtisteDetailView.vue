<template>
  <v-container>
    <v-row>
      <v-col>
        <v-img
          :src="artiste.photo"
          max-width="400"
          max-height="400"></v-img>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title>
            <h1>{{artiste.nom}}</h1>
          </v-card-title>
          <v-card-text>
            <h2 class="ma-2">Catégorie : {{artiste.category.libelle}}</h2>
            <h2 class="ma-2">Genres :
              <span v-for="(genre, index) of artiste.faits" :key="genre.id_genre">
                {{genre.genre.libelle}}<span v-if="index !== Object.keys(artiste.faits).length - 1" >, </span>
              </span></h2>
            <a class="ma-2" v-if="artiste.lien_site" :href="artiste.lien_site"><v-icon>mdi-web</v-icon>&emsp;{{artiste.lien_site}}</a>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-card class="ma-4">
        <v-card-title>
          <h2>Description</h2>
        </v-card-title>
        <v-card-text>
          <p>{{artiste.biographie}}</p>
        </v-card-text>
      </v-card>
    </v-row>
    <v-row v-if="artiste.lien_video">
      <iframe width="1013" height="760" :src="artiste.lien_video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "ArtisteShow",
  data: () => ({
    artiste: null,
  }),
  methods: {
    async getArtiste() {
      return await axios.get("http://localhost:3000/artiste/" + this.$route.params.id)
          .then(response => {
            this.artiste = response.data
          })
          .catch(error => {
            console.log(error)
          });
    },
  },
  mounted() {
    this.getArtiste();
  },
}
</script>

<style scoped>
@import "../../public/css/show.css";
</style>