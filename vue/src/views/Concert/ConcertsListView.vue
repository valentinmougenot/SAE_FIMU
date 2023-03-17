<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="3">
        <v-text-field
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            label="Rechercher"
            outlined
            hide-details></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-select
            v-model="scenesId"
            :items="scenesSelect"
            :height="56"
            chips
            label="Scènes"
            multiple
            outlined>
          <template v-slot:selection="{ item, index }">
            <v-chip v-if="index <= 0">
              <span>{{ item.text }}</span>
            </v-chip>
            <span
                v-if="index === 1"
                class="grey--text text-caption">
                (+{{ scenesId.length - 1 }} autre<span v-if="scenesId.length - 2 > 1">s</span>)
              </span>
          </template>
        </v-select>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-text-field
            v-model="heureMin"
            type="time"
            label="Heure de début minimum"
            required
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-text-field
            v-model="heureMax"
            type="time"
            label="Heure de fin maximum"
            required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-btn
          class="ma-6 addDeleteBtn"
          :height="56"
          :to="'/concert/add'"
          color="success">Ajouter concert&emsp;<v-icon>mdi-plus-box-outline</v-icon>
      </v-btn>
      <v-btn
          class="ma-6 addDeleteBtn"
          :height="56"
          @click="deleteAll"
          color="error">Tout supprimer&emsp;<v-icon>mdi-delete</v-icon></v-btn>
    </v-row>
    <v-row>
      <v-tabs
          v-model="dateSelected"
          align-with-title
          class="mb-5"
      >
        <v-tab v-for="(date, i) in dates" :key="i" @click="getConcerts(date)">
          {{ date }}
        </v-tab>
        <v-tabs-slider color="pink"></v-tabs-slider>
      </v-tabs>
    </v-row>
    <v-row class="table-center">
      <TableList
      :data="filtres"
      :fields="['na', 'ns', 'hd', 'd', 'np']"
      :titles="['Artiste', 'Scene', 'Heure de début', 'Durée', 'Affluence', 'Actions']"
      :buttons="[
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
import {get, remove} from "@/services/axios.service"
import {mapState} from "vuex";

export default {
  name: "ConcertsListView",
  data: () => ({
    search: '',
    dates: [],
    concerts: [],
    scenesId: [],
    heureMin: '',
    heureMax: '',
    dateSelected: ''
  }),
  components: {
    TableList: () => import('@/components/TableList.vue'),
  },
  methods: {
    async getDates() {
      this.dates = [];
      await get(`/concert/date`, {headers: {'saison': this.$store.state.saisonSelected}})
          .then(response => {
            response.data.data.forEach(date => {
              this.dates.push(date.date_debut)
            })
          })
          .catch(error => {
            console.log(error)
          });
    },
    async getConcerts(date) {
      await get(`/concert?date=${date}`, {headers: {'saison': this.$store.state.saisonSelected}})
          .then(response => {
            console.log(response.data.data)
            this.concerts = response.data.data.map(concert => {
              return {
                id: concert.id,
                id_scene: concert.sceneId,
                na: concert.artiste.nom,
                ns: concert.scene.libelle,
                hd: concert.heure_debut,
                d: concert.duree,
                np: concert.nbPersonnes,
              }
            })
          })
          .catch(error => {
            console.log(error)
          });
    },
    buttonClick(id, index) {
      switch (index) {
        case 0:
          this.$router.push('/concert/' + id + '/edit')
          break;
        case 1:
          this.deleteConcert(id);
          break;
      }
    },
    async deleteConcert(id) {
       await remove(`/concert/${id}`, {headers: {'saison': this.$store.state.saisonSelected}})
          .then(async () => {
            const dateSel = Math.min(this.dateSelected, this.dates.length - 2);
            await this.getDates();
            await this.getConcerts(this.dates[dateSel]);
          })
          .catch(error => {
            alert(error.response.data.message);
          });
    },
    async deleteAll() {
      if (confirm("Voulez-vous vraiment supprimer tous les concerts ?")) {
         await remove(`${this.$store.state.sselected}/concert`)
            .then(() => {
              this.getDates();
              this.getConcerts(this.dates[0]);
            })
            .catch(error => {
              alert(error.response.data.message);
            });
      }
    },
    artistesFiltres() {
      return this.concerts.filter(concert => {
        return concert.na.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    scenesFiltres() {
      return this.concerts.filter(concert => {
        return this.scenesId.includes(concert.id_scene)
      })
    },
  },
  computed: {
    ...mapState(['scenes']),
    scenesSelect() {
      return this.$store.state.scenes.map(scene => {
        return {
          value: scene.id,
          text: scene.libelle
        };
      });
    },
    filtres() {
      let f = this.artistesFiltres();
      if (this.scenesId.length > 0) {
        f = f.filter(concert => {
          return this.scenesId.includes(concert.id_scene)
        })
      }
      if (this.heureMin !== '') {
        f = f.filter(concert => {
          return concert.hd >= this.heureMin
        })
      }
      if (this.heureMax !== '') {
        f = f.filter(concert => {
          const h = parseInt(concert.d / 60);
          const m = concert.d % 60;
          let hFin = parseInt(concert.hd.split(':')[0]) + h;
          let mFin = parseInt(concert.hd.split(':')[1]) + m;
          if (mFin >= 60) {
            hFin += 1;
            mFin -= 60;
          }
          if (mFin < 10) {
            mFin = '0' + mFin
          }
          if (hFin < 10) {
            hFin = '0' + hFin
          }
          const heureFin = hFin + ':' + mFin;
          return heureFin <= this.heureMax
        })
      }
      return f;
    }
  },
  async created() {
    await this.getDates();
    await this.getConcerts(this.dates[0]);
    if (this.scenes.length === 0) {
      await this.$store.dispatch("getScenes");
    }
  },

}
</script>

<style scoped>
@import "@/../public/css/show.css";
</style>