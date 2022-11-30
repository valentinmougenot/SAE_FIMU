<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="6">
        <v-text-field
            v-model="search"
            class="ma-4"
            prepend-inner-icon="mdi-magnify"
            label="Rechercher"
            outlined
            hide-details></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-select
            v-model="typescene"
            class="ma-4"
            :items="typescenes"
            :height="56"
            chips
            label="Type de scène"
            multiple
            outlined>
        </v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-btn
          v-model="ajouter"
          class="addDeleteBtn ma-6"
          color="success addArtiste"
          :height="56"
          :href="'/scene/add'">Ajouter scène&emsp;<v-icon>mdi-plus-box-outline</v-icon>
      </v-btn>
      <v-btn
          class="addDeleteBtn ma-6"
          color="error"
          :height="56"
          @click="deleteAll()">Tout supprimer&emsp;<v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-row>
    <v-row class="table-center">
      <table class="listing">
        <thead>
        <tr>
          <th>Nom scène</th>
          <th>Latitude</th>
          <th>Longitude</th>
          <th>Type de scène</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="scene in filtres" :key="scene.id">
            <td>{{scene.libelle}}</td>
            <td>{{scene.latitude}}</td>
            <td>{{scene.longitude}}</td>
            <td>{{scene.typescene.libelle}}</td>
            <td>
              <v-btn class="ma-1" color="success" :href="'/scene/' + scene.id"><v-icon>mdi-magnify</v-icon></v-btn>
              <v-btn class="ma-1" color="primary" :href="'/scene/' + scene.id + '/edit'"><v-icon>mdi-pencil</v-icon></v-btn>
              <v-btn class="ma-1" color="error" @click="deleteScene(scene.id)"><v-icon>mdi-delete</v-icon></v-btn>
            </td>
          </tr>
        </tbody>
      </table>
    </v-row>
  </v-container>
</template>


<script>
import Vue from "vue";
export default {
  name: "ScenesListView",
  data: () => ({
    scenes: [],
    typescenes: [],
    search: "",
    typescene: [],
    ajouter: false,
  }),
  methods: {
    async getScenes() {
      return await Vue.axios.get("http://localhost:3000/scene")
          .then(response => {
            this.scenes = response.data
          })
          .catch(error => {
            console.log(error)
          });
    },
    async getTypescenes() {
      return await Vue.axios.get("http://localhost:3000/typescene")
          .then(response => {
            response.data.forEach(typescene => {
              this.typescenes.push(typescene.libelle)
            })
          })
          .catch(error => {
            console.log(error)
          });
    },
    scenesFiltres() {
      return this.scenes.filter(scene => {
        return scene.libelle.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    typescenesFiltres() {
      if (this.typescene.length === 0) {
        return this.scenes;
      }
      return this.scenes.filter(scene => {
        return this.typescene.includes(scene.typescene.libelle)
      })
    },
    deleteScene(id) {
      Vue.axios.delete("http://localhost:3000/scene/" + id)
          .then(response => {
            this.getScenes()
            return response.data
          })
          .catch(error => {
            console.log(error)
          });
    },
    deleteAll() {
      if (confirm("Voulez-vous vraiment supprimer toutes les scènes ?")) {
        Vue.axios.delete("http://localhost:3000/scene")
            .then(response => {
              this.getScenes()
              return response.data
            })
            .catch(error => {
              console.log(error)
            });
      }
    }
  },
  mounted() {
    this.getScenes();
    this.getTypescenes();
  },
  computed: {
    filtres() {
      return this.scenesFiltres().filter(scene => {
        return this.typescenesFiltres().includes(scene)
      })
    }
  }
}
</script>

<style scoped>
@import "../../public/css/show.css";
</style>