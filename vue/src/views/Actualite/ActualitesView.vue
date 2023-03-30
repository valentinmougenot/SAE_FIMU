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
            v-model="typeactualites"
            class="ma-4"
            :items="typeactuSelect"
            :height="56"
            chips
            label="Type d'actualités"
            multiple
            outlined>
        </v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-btn
          class="addDeleteBtn ma-6"
          color="success"
          :height="56"
          @click="$router.push('/actualite/add')">Ajouter actualité&emsp;<v-icon>mdi-plus-box-outline</v-icon>
      </v-btn>
      <v-btn
          class="addDeleteBtn ma-6"
          color="error"
          :height="56"
          @click="deleteAll()">Tout supprimer&emsp;<v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-row>
    <v-card class="ma-4" v-for="(actu, i) in filtres" :key="i" :class="{'bginfo': actu.typeactu.libelle === 'Information', 'bgwarn': actu.typeactu.libelle === 'Avertissement', 'bgdanger': actu.typeactu.libelle === 'Urgent'}">
      <v-card-title>
        <h2>{{ actu.titre }}</h2>
      </v-card-title>
      <v-card-subtitle>
        <h4>{{actu.typeactu.libelle}} - {{actu.dateEnvoi}}</h4>
      </v-card-subtitle>
      <v-card-text>
        <p>{{ actu.contenu }}</p>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="$router.push('/actualite/' + actu.id + '/edit')"><v-icon>mdi-pencil</v-icon></v-btn>
        <v-btn color="error" @click="deleteActualite(actu.id)"><v-icon>mdi-delete</v-icon></v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import {remove} from "@/services/axios.service.js";
import {mapState} from "vuex";

export default {
  name: "ActualitesView",
  data: () => ({
    search: "",
    typeactualites: [],
  }),
  methods: {
    titresFiltres() {
      return this.actualites.filter(actualite => {
        return actualite.titre.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    typeactualitesFiltres() {
      if (this.typeactualites.length === 0) {
        return this.actualites;
      }
      return this.actualites.filter(actualite => {
        return this.typeactualites.includes(actualite.typeactu.id)
      })
    },
    async deleteActualite(id) {
       await remove('actualite/' + id)
        .then(() => {
          this.$store.dispatch("getActualites");
        })
        .catch(error => {
          alert(error.response.data.message);
        });
    },
    async deleteAll() {
      if (confirm("Voulez-vous vraiment supprimer toutes les actualités ?")) {
         await remove('actualite')
            .then(() => {
              this.$store.dispatch("getActualites");
            })
            .catch(error => {
              alert(error.response.data.message);
            });
      }
    }
  },
  computed: {
    ...mapState(["actualites", "typeactu"]),
    filtres() {
      return this.titresFiltres().filter(actualite => {
        return this.typeactualitesFiltres().includes(actualite)
      })
    },
    typeactuSelect() {
      return this.typeactu.map(typeactu => {
        return {
          text: typeactu.libelle,
          value: typeactu.id
        }
      })
    },
  },
  mounted() {
    if (this.$store.state.typeactu.length === 0) {
      this.$store.dispatch("getTypeactu");
    }
    if (this.$store.state.actualites.length === 0) {
      this.$store.dispatch("getActualites");
    }
  },

}
</script>

<style scoped>
@import '@/../public/css/show.css';
</style>