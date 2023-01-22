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
            <h2 class="ma-2">{{artiste.pays.length > 1 ? 'Origines' : 'Origine'}} :
            {{artiste.pays.map(pays => pays.libelle).join(', ')}}</h2>
            <h2 class="ma-2">Catégorie : {{artiste.category.libelle}}</h2>
            <h2 class="ma-2">{{artiste.genres.length > 1 ? 'Genres' : 'Genre'}} :
              {{artiste.genres.map(genre => genre.libelle).join(', ')}}
              </h2>
            <a class="ma-2" v-if="artiste.lien_site" :href="artiste.lien_site"><v-icon>mdi-web</v-icon>&emsp;{{artiste.lien_site}}<br></a>
            <a class="ma-2" v-for="(rs, i) in artiste.reseauxsociauxes" :key="i"><v-icon>{{rs.logo}}</v-icon>&emsp;{{rs.possede.lien}}<br></a>
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
import {get} from "@/services/axios.service.js";
export default {
  name: "ArtisteShow",
  data: () => ({
    artiste: null,
  }),
  methods: {
    async getArtiste() {
      await get(`${this.$store.state.sselected}/artiste/` + this.$route.params.id)
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
  beforeCreate() {
    if (!this.$session.exists()) {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
@import "@/../public/css/show.css";
</style>