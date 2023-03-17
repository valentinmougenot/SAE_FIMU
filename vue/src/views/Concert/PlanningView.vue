<template>
  <v-container>
    <v-row>
        <v-tabs
            align-with-title
            class="mb-5"
        >
          <v-tab v-for="(date, i) in dates" :key="i" @click="changeConcert(date)">
            {{ date }}
          </v-tab>
          <v-tabs-slider color="pink"></v-tabs-slider>
        </v-tabs>
    </v-row>
    <table>
      <tr>
        <td class="row-0"></td>
        <td v-for="(heure, i) in heures" :key="i" class="row-0"><span>{{heure}}</span></td>
      </tr>
      <tr v-for="(scene, index) in scenes" :key="index">
        <td class="borderleft borderright sceneName" style="background-color: #e6e6e8"><p>{{scene.libelle}}</p></td>
        <td v-for="(heure, i) in heures.slice(0, -1)" :key="i" :class="{borderright: (i % 4 === 3)}" :id="scene.id + '-' + i"></td>
      </tr>
    </table>
  </v-container>
</template>

<script>
import {get} from "@/services/axios.service.js";

export default {
  name: "ConcertsView",
  data: () => ({
    scenes: [],
    heureDebut: 12,
    heureFin: 22,
    nbCreneaux: null,
    dureeCreneau: null,
    heures: [],
    concerts: [],
    dates: [],
  }),
  methods: {
    init() {
      this.dureeCreneau = 15;
      this.nbCreneaux = (this.heureFin - this.heureDebut) * (60 / this.dureeCreneau) + 1;
      for(let i = 0; i < this.nbCreneaux; i++) {
        var heure = this.heureDebut + Math.floor(i / 4);
        var minute = (i % 4) * this.dureeCreneau;
        if (minute === 0) {
          minute = "00";
          this.heures.push(heure + ":" + minute);
        }
        else {
          this.heures.push("");
        }
      }
    },
    async getScenes() {
      await get(`/scene`, {headers: {'saison': this.$store.state.saisonSelected}})
          .then(response => {
            this.scenes = response.data.data;
            this.scenes.forEach(scene => {
              if (scene.libelle.length > 15)
                scene.libelle = scene.libelle.substring(0, 12) + "...";
            })
          })
          .catch(error => {
            console.log(error)
          });
    },
    async getConcerts(date) {
      await get(`/concert?date=` + date, {headers: {'saison': this.$store.state.saisonSelected}})
          .then(response => {
            this.concerts = response.data.data.map(concert => {
              return {
                id: concert.id,
                sceneId: concert.sceneId,
                artiste: concert.artiste.nom,
                heureDebut: parseInt(concert.heure_debut.slice(0, 2)),
                minuteDebut: parseInt(concert.heure_debut.slice(3, 5)),
                duree: concert.duree / 15,
                couleur: concert.artiste.categorie.couleur,
                genres: concert.artiste.genres.map(genre => genre.libelle)
              }
          })
          })
          .catch(error => {
            console.log(error)
          });
    },
    async getDates() {
      await get(`/concert/date`, {headers: {'saison': this.$store.state.saisonSelected}})
          .then(response => {
            response.data.data.forEach(date => {
              this.dates.push(date.date_debut);
            })
          })
          .catch(error => {
            console.log(error)
          });
    },
    async getHeureMin(date) {
      await get(`/concert/heuremin?date=${date}`, {headers: {'saison': this.$store.state.saisonSelected}})
          .then(response => {
            this.heureDebut = parseInt(response.data.data.heure_debut.slice(0, 2));
          })
          .catch(error => {
            console.log(error)
          });
    },
    async getHeureMax(date) {
      await get(`/concert/heuremax?date=${date}`, {headers: {'saison': this.$store.state.saisonSelected}})
          .then(response => {
            this.heureFin = parseInt(response.data.data.heure_fin.slice(0, 2));
            if (response.data.data.heure_fin.slice(3, 5) !== "00")
              this.heureFin++;
          })
          .catch(error => {
            console.log(error)
          });
    },
    async affectConcerts() {
      const tdDelete = document.querySelectorAll('td');
      tdDelete.forEach(td => {
        if (!(td.className.includes("sceneName") || td.className.includes("row-0"))) {
          while (td.firstChild) {
            td.removeChild(td.firstChild);
          }
          td.style.display = "table-cell";
        }
      });
      this.concerts.forEach(concert => {
        const td = document.getElementById(concert.sceneId + "-" + ((concert.heureDebut - this.heureDebut) * 4 + concert.minuteDebut / this.dureeCreneau));
        const span = document.createElement("span");
        span.style.backgroundColor = concert.couleur;
        span.style.position = "relative";
        span.style.display = "flex";
        span.style.flexDirection = "column";
        span.style.justifyContent = "center";
        span.style.height = "130px";
        span.style.color = "white";
        span.style.overflow = "hidden";
        td.setAttribute("colspan", concert.duree.toString());
        const artiste = document.createElement("p");
        artiste.innerHTML = concert.artiste;
        const genres = document.createElement("p");
        genres.innerHTML = concert.genres.join(", ");
        span.appendChild(artiste);
        span.appendChild(genres);
        td.appendChild(span);
        for(var i = 1; i < concert.duree; i++) {
          const td = document.getElementById(concert.sceneId + "-" + ((concert.heureDebut - this.heureDebut) * 4 + concert.minuteDebut / this.dureeCreneau + i));
          td.style.display = "none";
        }
      })
    },
    async changeConcert(date) {
      this.heures = [];
      await this.getConcerts(date);
      await this.getHeureMin(date);
      await this.getHeureMax(date);
      await this.init();
      await this.affectConcerts();
    }
  },
  async created() {
    await this.getDates();
    await this.getHeureMin(this.dates[0]);
    await this.getHeureMax(this.dates[0]);
    await this.init();
    await this.getScenes();
    await this.getConcerts(this.dates[0]);
    // nextTick permet d'attendre que le DOM soit chargé
    await this.$nextTick();
    await this.affectConcerts();
  }
}
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
  table-layout: fixed;
}
td, th {
  border-top: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
  text-align: center;
}
.row-0 {
  transform: translateX(-50%);
  border: none;
}
p {
  writing-mode: vertical-lr;
  transform: scale(-1);
  margin: 0.8rem auto;
}
.borderright {
  border-right: 1px solid #dddddd;
}
.borderleft {
  border-left: 1px solid #dddddd;
}
tr:not(:first-child) {
  height: 130px;
}
</style>