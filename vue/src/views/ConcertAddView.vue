<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h1 class="display-1">Ajouter un concert</h1>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" lazy-validation>
              <v-select
                  v-model="concert.id_artiste"
                  :items="artistesSelect"
                  label="Artiste"
                  required
              ></v-select>
              <v-select
                  v-model="concert.id_scene"
                  :items="scenesSelect"
                  label="Scène"
                  required
              ></v-select>
              <v-text-field
                  v-model="concert.heure_debut"
                  type="time"
                  label="Heure"
                  required
              ></v-text-field>
              <v-text-field
                  v-model="concert.date_debut"
                  type="date"
                  label="Heure"
                  required
              ></v-text-field>
              <v-text-field
                type="number"
                v-model="concert.duree"
                label="Durée"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="addConcert">Ajouter</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from "vue";
export default {
  name: "ConcertAddView",
  data: () => {
    return {
      concert: {
        id_artiste: null,
        id_scene: null,
        heure_debut: null,
        date_debut: null,
        duree: null,
        nb_personnes: 0,
        annee: 2022
      }
    };
  },
  methods: {
    addConcert() {
      Vue.axios
        .post("http://localhost:3000/concert", this.concert)
        .then(() => {
          this.$store.dispatch("getConcerts");
          this.$router.push("/concert");
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  computed: {
    scenesSelect() {
      return this.$store.state.scenes.map(scene => {
        return {
          value: scene.id,
          text: scene.libelle
        };
      });
    },
    artistesSelect() {
      return this.$store.state.artistes.map(artiste => {
        return {
          value: artiste.id,
          text: artiste.nom
        };
      });
    }
  },
  mounted() {
    if (this.$store.state.scenes.length === 0) {
      this.$store.dispatch("getScenes");
    }
    if (this.$store.state.artistes.length === 0) {
      this.$store.dispatch("getArtistes");
    }
  }
}
</script>

<style scoped>

</style>