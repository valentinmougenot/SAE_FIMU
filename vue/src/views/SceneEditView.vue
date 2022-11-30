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
              color="primary"
              :height="56"
              class="addDeleteBtn"
              @click="editScene()">Modifier
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import Vue from "vue";
export default {
  name: "SceneEditView",
  data() {
    return {
      scene: {
        id: null,
        libelle: null,
        id_typescene: null,
        latitude: null,
        longitude: null,
        jauge: null
      },
      typescenes: [],
    };
  },
  methods: {
    getScene() {
      return Vue.axios
        .get("http://localhost:3000/scene/" + this.$route.params.id)
        .then((response) => {
          this.scene = response.data;
        });
    },
    async getTypescene() {
      return Vue.axios.get("http://localhost:3000/typescene").then((response) => {
        this.typescenes = response.data.map((typescene) => {
          return {
            text: typescene.libelle,
            value: typescene.id,
          };
        });
      });
    },
    async editScene() {
      if (this.scene.id_typescene === 1) {
        this.scene.jauge = null;
      }
      return await Vue.axios.put("http://localhost:3000/scene/" + this.$route.params.id, this.scene)
        .then(() => {
          this.$router.push("/scene");
        });
    },
  },
  created() {
    this.getScene();
    this.getTypescene();
  },
}
</script>

<style scoped>
@import "../../public/css/show.css";
</style>