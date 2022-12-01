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
          :items="categories"
          :height="56"
          chips
          label="Categories"
          multiple
          outlined>
          <template v-slot:selection="{ item, index }">
            <v-chip v-if="index <= 0">
              <span>{{ item }}</span>
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
            :items="genres"
            :height="56"
            chips
            label="Genres"
            multiple
            outlined>
          <template v-slot:selection="{ item, index }">
            <v-chip v-if="index <= 1">
              <span>{{ item }}</span>
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
            :items="origines"
            :height="56"
            chips
            label="Origines"
            multiple
            outlined>
          <template v-slot:selection="{ item, index }">
            <v-chip v-if="index <= 1">
              <span>{{ item }}</span>
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
          :href="'/artiste/add'"
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
<!--      <table class="listing">
        <thead>
          <tr>
            <th>Nom groupe</th>
            <th>Catégorie</th>
            <th>Genres</th>
            <th>Origines</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="artiste in filtres" :key="artiste.id">
            <td>{{artiste.nom}}</td>
            <td>{{artiste.category.libelle}}</td>
            <td>
              {{artiste.genres.map(genre => genre.libelle).join(', ')}}
            </td>
            <td>
              {{artiste.pays.map(pays => pays.libelle).join(', ')}}
            </td>
            <td>
              <v-btn class="ma-1" color="success" :href="'/artiste/' + artiste.id"><v-icon>mdi-magnify</v-icon></v-btn>
              <v-btn class="ma-1" color="primary" :href="'/artiste/' + artiste.id + '/edit'"><v-icon>mdi-pencil</v-icon></v-btn>
              <v-btn class="ma-1" color="error" @click="deleteArtiste(artiste.id)"><v-icon>mdi-delete</v-icon></v-btn>
            </td>
          </tr>
        </tbody>
      </table>-->
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
import Vue from "vue";
export default {
  name: "ArtisteView",
  components: {
    TableList: () => import("@/components/TableList.vue"),
  },
  data: () => ({
    artistes: [],
    categories: [],
    genres: [],
    origines: [],
    search: "",
    categorie: [],
    genre: [],
    origine: [],
  }),
  methods: {
    async getArtistes() {
      await Vue.axios.get("http://localhost:3000/artiste")
          .then(response => {
            this.artistes = response.data
            this.artistes.forEach(artiste => {
              artiste.cl = artiste.category.libelle
              artiste.gl = artiste.genres.map(genre => genre.libelle).join(', ')
              artiste.pl = artiste.pays.map(pays => pays.libelle).join(', ')
            })
          })
          .catch(error => {
            console.log(error)
          });
    },
    async getCategories() {
      return await Vue.axios.get("http://localhost:3000/categorie")
          .then(response => {
            response.data.forEach(categorie => {
              this.categories.push(categorie.libelle)
            })
          })
          .catch(error => {
            console.log(error)
          });
    },
    async getGenres() {
      return await Vue.axios.get("http://localhost:3000/genre")
          .then(response => {
            response.data.forEach(genre => {
              this.genres.push(genre.libelle)
            })
          })
          .catch(error => {
            console.log(error)
          });
    },
    async getOrigines() {
      return await Vue.axios.get("http://localhost:3000/pays")
          .then(response => {
            response.data.forEach(origine => {
              this.origines.push(origine.libelle)
            })
          })
          .catch(error => {
            console.log(error)
          });
    },
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
        return this.categorie.includes(artiste.category.libelle)
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
          if (!add && this.genre.includes(genre.libelle)) {
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
          if (!add && this.origine.includes(pays.libelle)) {
            add = true;
            result.push(artiste)
          }
        })
      })
      return result
    },

    deleteArtiste(id) {
      Vue.axios.delete("http://localhost:3000/artiste/" + id)
          .catch(error => {
            console.log(error)
          });
    },
    deleteAll() {
      if (confirm("Voulez-vous vraiment supprimer tous les artistes ?")) {
        Vue.axios.delete("http://localhost:3000/artiste")
            .catch(error => {
              console.log(error)
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
          this.deleteArtiste(id)
          break;
      }
    }
  },
  computed: {
    filtres() {
      return this.artistesFiltres().filter(artiste => {
        return this.categoriesFiltres().includes(artiste)
      }).filter(artiste => {
        return this.genresFiltres().includes(artiste)
      }).filter(artiste => {
        return this.origineFiltres().includes(artiste)
      })
    }
  },
  created() {
    this.getArtistes();
    this.getCategories();
    this.getGenres();
    this.getOrigines();
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