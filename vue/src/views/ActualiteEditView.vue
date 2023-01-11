<template>
  <v-container class="form-center">
    <v-form>
      <v-row>
        <v-col cols="12">
          <v-card-title>
            <h1 class="display-1">Modifier une actualité</h1>
          </v-card-title>
          <v-card-text>
            <v-text-field
                v-model="actualite.titre"
                label="Titre de l'actualité"
                required
            ></v-text-field>
            <v-select
                v-model="actualite.id_typeactu"
                :items="typeactuSelect"
                label="Type d'actualité"
                required
            ></v-select>
            <v-textarea
                v-model="actualite.contenu"
                label="Contenu"
                no-resize
                required
            ></v-textarea>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="editActualite">Modifier</v-btn>
            </v-card-actions>
          </v-card-text>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import Vue from 'vue';
import {mapState} from "vuex";

export default {
  name: "ActualiteAddView",
  data: () => ({
    actualite: {
      titre: "",
      contenu: "",
      id_typeactu: "",
    },
  }),
  methods: {
    getActualite() {
      Vue.axios.get('http://localhost:3000/actualite/' + this.$route.params.id)
        .then((response) => {
          this.actualite = response.data;
        })
    },
    editActualite() {
      Vue.axios.put('http://localhost:3000/actualite/' + this.$route.params.id, this.actualite)
          .then(() => {
            this.$store.dispatch('getActualites');
            this.$router.push('/actualite');
          })
          .catch(error => {
            alert(error.response.data.message);
          });
    }
  },
  computed: {
    ...mapState(["typeactu"]),
    typeactuSelect() {
      return this.typeactu.map(typeactu => {
        return {
          text: typeactu.libelle,
          value: typeactu.id
        }
      })
    }
  },
  mounted() {
    if (this.$store.state.typeactu.length === 0) {
      this.$store.dispatch("getTypeactu");
    }
    this.getActualite();
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