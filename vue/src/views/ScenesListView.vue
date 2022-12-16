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
            :items="typescenesSelect"
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
      <TableList
        :data="filtres"
        :fields="['libelle', 'latitude', 'longitude', 'tsl']"
        :titles="['Nom scène', 'Latitude', 'Longitude', 'Type de scène', 'Actions']"
        :buttons="[
          {
            icon: 'mdi-magnify',
            color: 'success'
          },
          {
            icon: 'mdi-pencil',
            color: 'primary'
          },
          {
            icon: 'mdi-delete',
            color: 'error'
          },
        ]"
        :pk="'id'"
        @button-click="buttonClick"
        ></TableList>
    </v-row>
  </v-container>
</template>


<script>
import Vue from "vue";
import {mapState} from "vuex";
export default {
  name: "ScenesListView",
  components: {
    TableList: () => import("@/components/TableList.vue"),
  },
  data: () => ({
    search: "",
    typescene: [],
  }),
  methods: {
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
        return this.typescene.includes(scene.typescene.id)
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
    },
    buttonClick(id, buttonIndex) {
      if (buttonIndex === 0) {
        this.$router.push('/scene/' + id);
      }
      else if (buttonIndex === 1) {
        this.$router.push('/scene/' + id + '/edit');
      }
      else if (buttonIndex === 2) {
        this.deleteScene(id)
      }
    }
  },
  computed: {
    ...mapState(['scenes', 'typescenes']),
    filtres() {
      return this.scenesFiltres().filter(scene => {
        return this.typescenesFiltres().includes(scene)
      })
    },
    typescenesSelect() {
      return this.typescenes.map(typescene => {
        return {
          value: typescene.id,
          text: typescene.libelle
        }
      })
    }
  },
  mounted() {
    if (this.scenes.length === 0) {
      this.$store.dispatch('getScenes')
    }
    if (this.typescenes.length === 0) {
      this.$store.dispatch('getTypescenes')
    }
  },
  beforeCreate() {
    if (!this.$session.exists()) {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
@import "../../public/css/show.css";
</style>