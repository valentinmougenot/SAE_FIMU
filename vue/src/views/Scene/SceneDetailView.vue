<template>
  <v-container>
    <v-row>
      <v-card>
        <v-card-title>
          <h1>{{scene.libelle}}</h1>
        </v-card-title>
        <v-card-text>
          <ul>
            <li>Latitude : {{scene.latitude}}</li>
            <li>Longitude : {{scene.longitude}}</li>
            <li>Type de scène : {{scene.typescene.libelle}}</li>
            <li v-if="scene.jauge">Jauge maximum : {{scene.jauge}}</li>
          </ul>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import {get} from "@/services/axios.service.js";
export default {
  name: "SceneDetailView",
  data: () => ({
    scene: null
  }),
  methods: {
    async getScene() {
      await get(`/scene/${this.$route.params.id}`, {headers: {'saison': this.$store.state.saisonSelected}})
          .then(response => {
            this.scene = response.data.data;
          })
          .catch(error => {
            console.log(error)
          });
    },
  },
  created() {
    this.getScene()
  },

}
</script>

<style scoped>

</style>