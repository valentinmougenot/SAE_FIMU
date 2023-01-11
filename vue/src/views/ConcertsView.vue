<template>
  <v-container>
    <v-row>
        <v-tabs
            v-model="tabs"
            align-with-title
        >
          <v-tab v-for="(date, i) in dates" :key="i" @click="changeConcert(date)">
            {{ date }}
          </v-tab>
          <v-tabs-slider color="pink"></v-tabs-slider>
        </v-tabs>
    </v-row>
    <v-row>
      <v-btn
          class="ma-6 addDeleteBtn"
          :height="56"
          :href="'/concert/add'"
          color="success">Ajouter concert&emsp;<v-icon>mdi-plus-box-outline</v-icon>
      </v-btn>
    </v-row>
    <table>
      <tr>
        <td class="row-0"></td>
        <td v-for="(heure, i) in heures" :key="i" class="row-0"><span>{{heure}}</span></td>
      </tr>
      <tr v-for="(scene, index) in scenes" :key="index">
        <td class="borderleft borderright sceneName"><p>{{scene.libelle}}</p></td>
        <td v-for="(heure, i) in heures.slice(0, -1)" :key="i" :class="{borderright: (i % 4 === 3)}" :id="scene.id + '-' + i"></td>
      </tr>
    </table>
  </v-container>
</template>

<script>
import Vue from "vue";

export default {
  name: "ConcertsView",
  data: () => ({
    scenes: [],
    heureDebut: null,
    heureFin: null,
    nbCreneaux: null,
    dureeCreneau: null,
    heures: [],
    concerts: [],
    dates: [],
  }),
  methods: {
    init() {
      this.heureDebut = 12;
      this.heureFin = 22;
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
      return await Vue.axios.get("http://localhost:3000/scene")
          .then(response => {
            this.scenes = response.data;
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
      return await Vue.axios.get("http://localhost:3000/concert/date/" + date)
          .then(response => {
            this.concerts = response.data.map(concert => {
              return {
                id: concert.id,
                id_scene: concert.id_scene,
                artiste: concert.artiste.nom,
                heureDebut: parseInt(concert.heure_debut.slice(0, 2)),
                minuteDebut: parseInt(concert.heure_debut.slice(3, 5)),
                duree: concert.duree / 15,
                couleur: concert.artiste.category.couleur,
                genres: concert.artiste.genres.map(genre => genre.libelle)
              }
          })
          })
          .catch(error => {
            console.log(error)
          });
    },
    async getDates() {
      return await Vue.axios.get("http://localhost:3000/concert/date")
          .then(response => {
            response.data.forEach(date => {
              this.dates.push(date.date_debut);
            })
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
          td.setAttribute("colspan", 1);
          td.style.display = "table-cell";
        }
      });
      this.concerts.forEach(concert => {
        const td = document.getElementById(concert.id_scene + "-" + ((concert.heureDebut - this.heureDebut) * 4 + concert.minuteDebut / this.dureeCreneau));
        const a = document.createElement("a");
        a.href = "/concert/" + concert.id;
        a.style.backgroundColor = concert.couleur;
        a.style.position = "relative";
        a.style.display = "flex";
        a.style.flexDirection = "column";
        a.style.justifyContent = "center";
        a.style.height = "130px";
        a.style.color = "white";
        a.style.textDecoration = "none";
        td.setAttribute("colspan", concert.duree.toString());
        const artiste = document.createElement("p");
        artiste.innerHTML = concert.artiste;
        const genres = document.createElement("p");
        genres.innerHTML = concert.genres.join(", ");
        a.appendChild(artiste);
        a.appendChild(genres);
        td.appendChild(a);
        for(var i = 1; i < concert.duree; i++) {
          const td = document.getElementById(concert.id_scene + "-" + ((concert.heureDebut - this.heureDebut) * 4 + concert.minuteDebut / this.dureeCreneau + i));
          td.style.display = "none";
        }
      })
    },
    async changeConcert(date) {
      await this.getConcerts(date);
      await this.affectConcerts();
    }
  },
  mounted() {
    this.init();
    this.getScenes();
    this.getDates();
  },
  updated() {
    if (this.dates.length > 0) {
      this.getConcerts(this.dates[0]).then(() => {
        this.affectConcerts();
      });
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
  transform: translateX(-100%);
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