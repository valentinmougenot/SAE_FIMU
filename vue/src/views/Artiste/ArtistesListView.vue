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
          v-model="categorie"
          :items="categoriesSelect"
          :height="56"
          chips
          label="Categories"
          multiple
          outlined>
          <template v-slot:selection="{ item, index }">
            <v-chip v-if="index <= 0">
              <span>{{ item.text }}</span>
            </v-chip>
            <span
                v-if="index === 1"
                class="grey--text text-caption">
                (+{{ categorie.length - 1 }} autre<span v-if="categorie.length - 2 > 1">s</span>)
              </span>
          </template>
        </v-select>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-select
            v-model="genre"
            :items="genresSelect"
            :height="56"
            chips
            label="Genres"
            multiple
            outlined>
          <template v-slot:selection="{ item, index }">
            <v-chip v-if="index <= 1">
              <span>{{ item.text }}</span>
            </v-chip>
            <span
                v-if="index === 2"
                class="grey--text text-caption">
                  (+{{ genre.length - 2 }} autre<span v-if="genre.length - 2 > 1">s</span>)
                </span>
          </template>
        </v-select>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-select
            v-model="origine"
            :items="originesSelect"
            :height="56"
            chips
            label="Origines"
            multiple
            outlined>
          <template v-slot:selection="{ item, index }">
            <v-chip v-if="index <= 1">
              <span>{{ item.text }}</span>
            </v-chip>
            <span
                v-if="index === 2"
                class="grey--text text-caption">
                  (+{{ origine.length - 2 }} autre<span v-if="origine.length - 2 > 1">s</span>)
                </span>
          </template>
        </v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-btn
          class="ma-6 addDeleteBtn"
          :height="56"
          :to="'/artiste/add'"
          color="success">Ajouter artiste&emsp;<v-icon>mdi-plus-box-outline</v-icon>
      </v-btn>
      <v-btn
          class="ma-6 addDeleteBtn"
          :height="56"
          color="error"
          @click="deleteAll()">Tout supprimer&emsp;<v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-row>

    <v-row class="table-center">
      <TableList
        :data="filtres"
        :fields="['nom', 'cl', 'gl', 'pl']"
        :titles="['Nom groupe', 'Catégorie', 'Genres', 'Origines', 'Actions']"
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
import{remove} from "@/services/axios.service.js";
import {mapState} from "vuex";
export default {
  name: "ArtisteView",
  components: {
    TableList: () => import("@/components/TableList.vue"),
  },
  data: () => ({
    search: "",
    categorie: [],
    genre: [],
    origine: [],
  }),
  methods: {
    artistesFiltres() {
      return this.artistes.filter(artiste => {
        return artiste.nom.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    categoriesFiltres() {
      if (this.categorie.length === 0) {
        return this.artistes;
      }
      return this.artistes.filter(artiste => {
        return this.categorie.includes(artiste.categorie.id);
      })
    },
    genresFiltres() {
      if (this.genre.length === 0) {
        return this.artistes;
      }
      let add = false;
      let result = []
      this.artistes.forEach(artiste => {
        add = false;
        artiste.genres.forEach(genre => {
          if (!add && this.genre.includes(genre.id)) {
            add = true;
            result.push(artiste)
          }
        })
      })
      return result
    },
    origineFiltres() {
      if (this.origine.length === 0) {
        return this.artistes;
      }
      let add = false;
      let result = []
      this.artistes.forEach(artiste => {
        add = false;
        artiste.pays.forEach(pays => {
          if (!add && this.origine.includes(pays.id)) {
            add = true;
            result.push(artiste)
          }
        })
      })
      return result
    },

    async deleteArtiste(id) {
       await remove(`${this.$store.state.sselected}/artiste/` + id, {headers: {'saison': this.$store.state.saisonSelected}})
          .then(() => {
            this.$store.dispatch("getArtistes");
          })
          .catch(error => {
            alert(error.response.data.message);
          });
    },
    async deleteAll() {
      if (confirm("Voulez-vous vraiment supprimer tous les artistes ?")) {
         await remove(`${this.$store.state.sselected}/artiste`, {headers: {'saison': this.$store.state.saisonSelected}})
            .then(() => {
              this.$store.dispatch("getArtistes");
            })
            .catch(error => {
              alert(error.response.data.message);
            });
      }
    },
    buttonClick(id, index) {
      switch (index) {
        case 0:
          this.$router.push('/artiste/' + id)
          break;
        case 1:
          this.$router.push('/artiste/' + id + '/edit')
          break;
        case 2:
          this.deleteArtiste(id);
          break;
      }
    }
  },
  computed: {
    ...mapState(['artistes', 'categories', 'genres', 'pays']),
    filtres() {
      return this.artistesFiltres().filter(artiste => {
        return this.categoriesFiltres().includes(artiste)
      }).filter(artiste => {
        return this.genresFiltres().includes(artiste)
      }).filter(artiste => {
        return this.origineFiltres().includes(artiste)
      })
    },
    categoriesSelect() {
      return this.categories.map(categorie => {
        return {
          value: categorie.id,
          text: categorie.libelle
        }
      })
    },
    genresSelect() {
      return this.genres.map(genre => {
        return {
          value: genre.id,
          text: genre.libelle
        }
      })
    },
    originesSelect() {
      return this.pays.map(pays => {
        return {
          value: pays.id,
          text: pays.libelle
        }
      })
    },
  },
  created() {
    if (this.artistes.length === 0) {
      this.$store.dispatch("getArtistes");
    }
    if (this.categories.length === 0) {
      this.$store.dispatch("getCategories");
    }
    if (this.genres.length === 0) {
      this.$store.dispatch("getGenres");
    }
    if (this.pays.length === 0) {
      this.$store.dispatch("getPays");
    }
  },
}
</script>

<style scoped>
@import "@/../public/css/show.css";
</style>