<template>
  <v-container class="form-center">
    <v-form>
      <v-row>
        <v-col cols="2" sm="2" md="3">
          <v-text-field
              v-model="scene.libelle"
              label="Nom de la scène"
              outlined
          ></v-text-field>
        </v-col>
        <v-col cols="2" sm="2" md="3">
          <v-select
              v-model="scene.id_typescene"
              :items="typescenes"
              label="Type de scène"
              outlined
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" sm="2" md="3">
          <v-text-field
              v-model="scene.latitude"
              label="Latitude"
              outlined
          ></v-text-field>
        </v-col>
        <v-col cols="2" sm="2" md="3">
          <v-text-field
              v-model="scene.longitude"
              label="Longitude"
              outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" sm="2" md="3" v-if="scene.id_typescene == 2">
          <v-text-field
              v-model="scene.jauge"
              label="Jauge maximum"
              outlined
          ></v-text-field>
        </v-col>
        <v-col cols="2" sm="2" md="3">
          <v-btn
              color="success"
              :height="56"
              class="addDeleteBtn"
              @click="addScene()">Ajouter
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import Vue from "vue";
export default {
  name: "SceneAddView",
  data: () => ({
    scene: {
      libelle: null,
      latitude: null,
      longitude: null,
      id_typescene: null,
      jauge: null
    },
    typescenes: []
  }),
  methods: {
   async getTypescenes() {
      return await Vue.axios.get("http://localhost:3000/typescene")
          .then(response => {
            response.data.forEach(typescene => {
              this.typescenes.push({
                text: typescene.libelle,
                value: typescene.id
              })
            })
          })
          .catch(error => {
            console.log(error)
          });
    },
    async addScene() {
      if (this.scene.id_typescene === 1) {
        this.scene.jauge = null;
      }
      this.scene.jauge = parseInt(this.scene.jauge);
      this.scene.latitude = parseFloat(this.scene.latitude);
      this.scene.longitude = parseFloat(this.scene.longitude);
      return await Vue.axios.post("http://localhost:3000/scene", this.scene)
          .then(() => {
            this.$router.push("/scene")
          })
          .catch(error => {
            console.log(error)
          });
    },
  },
  created() {
    this.getTypescenes()
    console.log(this.typescenes)
  }
}
</script>

<style scoped>
@import '../../public/css/show.css';
</style>