<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h1 class="display-1">Modifier un concert</h1>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" lazy-validation>
              <v-select
                  v-model="concert.artisteId"
                  :items="artistesSelect"
                  label="Artiste"
                  required
              ></v-select>
              <v-select
                  v-model="concert.sceneId"
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
                  label="Date"
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
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="editConcert">Modifier</v-btn>
            </v-card-actions>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {get, put} from "@/services/axios.service";

export default {
  name: "ConcertEditView",
  data: () => {
    return {
      concert: {
        artisteId: null,
        sceneId: null,
        heure_debut: null,
        date_debut: null,
        duree: null,
        nb_personnes: 0,
        annee: 0
      }
    }
  },
  methods: {
    async getConcert() {
      await get(`/concert/${this.$route.params.id}`, {headers: {'saison': this.$store.state.saison}})
        .then(response => {
          this.concert = response.data.data;
          console.log(this.concert)
        })
        .catch(error => {
          console.log(error);
        });
    },
    async editConcert() {
      put(`/concert/${this.$route.params.id}`, this.concert, {headers: {'saison': this.$store.state.saison}})
        .then(() => {
          this.$router.push("/concert");
        })
          .catch(error => {
            alert(error.response.data.message);
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
    this.getConcert();
    if (this.$store.state.scenes.length === 0) {
      this.$store.dispatch("getScenes");
    }
    if (this.$store.state.artistes.length === 0) {
      this.$store.dispatch("getArtistes");
    }
  },

}
</script>

<style scoped>

</style>