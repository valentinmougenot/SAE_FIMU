<template>
  <v-container>
    <v-row>
      <v-card>
        <v-card-text>
          <ul>
            <li>Date : {{concert.date_debut}}</li>
            <li>Heure de début : {{concert.heure_debut}}</li>
            <li>Durée : {{concert.duree}} minutes</li>
            <li>Scène : {{concert.scene.libelle}}</li>
            <li>Artiste : {{concert.artiste.nom}}</li>
            <li v-if="concert.nb_personnes > 0">Nombre de personnes : {{concert.nb_personnes}}</li>
          </ul>
        </v-card-text>
      </v-card>
    </v-row>
    <v-row>
      <v-btn class="ma-1" @click="editConcert" color="primary"><v-icon>mdi-pencil</v-icon></v-btn>
      <v-btn class="ma-1" @click="deleteConcert" color="error"><v-icon>mdi-delete</v-icon></v-btn>
    </v-row>
  </v-container>
</template>

<script>
import Vue from "vue";
export default {
  name: "ConcertDetailView",
  data: () => ({
    concert: null
  }),
  methods: {
    async getConcert() {
      return await Vue.axios.get(`http://localhost:3000${this.$store.state.sselected}/concert/` + this.$route.params.id)
          .then(response => {
            this.concert = response.data
            console.log(this.concert)
          })
          .catch(error => {
            console.log(error)
          });
    },
    deleteConcert() {
      Vue.axios
          .delete(`http://localhost:3000${this.$store.state.sselected}/concert/` + this.$route.params.id)
          .then(() => {
            this.$store.dispatch("getConcerts");
            this.$router.push("/concert");
          })
          .catch(error => {
            alert(error.response.data.message);
          });
    },
    editConcert() {
      this.$router.push("/concert/" + this.$route.params.id + "/edit");
    }
  },
  mounted() {
    this.getConcert().then(() => {
      console.log(this.concert)
    })
  },
  beforeCreate() {
    if (!this.$session.exists()) {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>

</style>