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
import axios from "axios";
export default {
  name: "SceneDetailView",
  data: () => ({
    scene: null
  }),
  methods: {
    async getScene() {
      return await axios.get("http://localhost:3000/scene/" + this.$route.params.id)
          .then(response => {
            this.scene = response.data
          })
          .catch(error => {
            console.log(error)
          });
    },
  },
  created() {
    this.getScene()
  }
}
</script>

<style scoped>

</style>