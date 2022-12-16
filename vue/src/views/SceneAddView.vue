<template>
  <v-container class="form-center">
    <v-form>
      <v-row>
        <v-col cols="12">
          <v-card-title>
            <h1 class="display-1">Ajouter une scène</h1>
          </v-card-title>
          <v-card-text>
            <v-text-field
                v-model="scene.libelle"
                label="Nom de la scène"
                required
            ></v-text-field>
            <v-select
                v-model="scene.id_typescene"
                :items="typescenes"
                label="Type de scène"
                required
            ></v-select>
            <v-text-field
                v-model="scene.latitude"
                label="Latitude"
                required
            ></v-text-field>
            <v-text-field
                v-model="scene.longitude"
                label="Longitude"
                required
            ></v-text-field>
            <v-text-field
                v-if="scene.id_typescene===2"
                  v-model="scene.jauge"
                  label="Jauge maximum"
                  required
            ></v-text-field>
            <v-btn
                color="success"
                :height="56"
                class="addDeleteBtn"
                @click="addScene()">Ajouter
            </v-btn>
          </v-card-text>
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
            this.$store.dispatch("getScenes");
            this.$store.dispatch("getConcerts");
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