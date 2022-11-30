<template>
  <v-container>
    <v-form>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model="artiste.nom"
            label="Nom de l'artiste"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model="artiste.photo"
            label="Photo de l'artiste"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-select
              v-model="id_pays"
              :items="pays"
              label="Origine de l'artiste"
              :height="56"
              multiple
              chips
              outlined
          >
            <template v-slot:selection="{ item, index }">
              <v-chip v-if="index <= 1">
                <span>{{ item.text }}</span>
              </v-chip>
              <span
                  v-if="index === 2"
                  class="grey--text text-caption"
              >
                (+{{ id_pays.length - 2 }} autre<span v-if="id_pays.length - 2 > 1">s</span>)
              </span>
            </template>
          </v-select>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-select
              v-model="artiste.id_categorie"
              :items="categories"
              label="Catégorie de l'artiste"
              outlined
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-select
              v-model="id_genres"
              :items="genres"
              label="Genres de l'artiste"
              :height="56"
              multiple
              chips
              outlined
          >
            <template v-slot:selection="{ item, index }">
              <v-chip v-if="index <= 1">
                <span>{{ item.text }}</span>
              </v-chip>
              <span
                  v-if="index === 2"
                  class="grey--text text-caption"
              >
                (+{{ id_genres.length - 2 }} autre<span v-if="id_genres.length - 2 > 1">s</span>)
              </span>
            </template>
          </v-select>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field
              v-model="artiste.lien_video"
              label="Lien vidéo Youtube de l'artiste"
              outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-text-field
              v-model="artiste.lien_site"
              label="Lien site Web de l'artiste"
              outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field
              v-model="artiste.biographie"
              label="Description de l'artiste"
              outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-btn
            color="success"
            class="addDeleteBtn"
            :height="56"
            @click="addArtiste()"
          >
            Ajouter
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import Vue from "vue";
export default {
  name: "ArtisteAddView",
  data: () => ({
    artiste: {
      nom: null,
      photo: null,
      biographie: null,
      lien_video: null,
      lien_site: null,
      id_categorie: null,
    },
    categories: [],
    genres: [],
    pays: [],
    id_genres: [],
    id_pays: [],
  }),
  methods: {
    async getCategories() {
      return await Vue.axios.get("http://localhost:3000/categorie")
          .then(response => {
            this.categories = response.data.map(categorie => {
              return {
                value: categorie.id,
                text: categorie.libelle,
              }
            })
          })
          .catch(error => {
            console.log(error)
          });
    },
    async getGenres() {
      return await Vue.axios.get("http://localhost:3000/genre")
          .then(response => {
            this.genres = response.data.map(genre => {
              return {
                value: genre.id,
                text: genre.libelle,
              }
            })
          })
          .catch(error => {
            console.log(error)
          });
    },
    async getPays() {
      return Vue.axios.get("http://localhost:3000/pays")
          .then(response => {
            this.pays = response.data.map(pays => {
              return {
                value: pays.id,
                text: pays.libelle,
              }
            })
          })
          .catch(error => {
            console.log(error)
          });
    },
    async addArtiste() {
      if (this.artiste.lien_video && this.artiste.lien_video.length === 0) {
        this.artiste.lien_video = null;
      }
      if (this.artiste.lien_site && this.artiste.lien_site.length === 0) {
        this.artiste.lien_site = null;
      }
      await Vue.axios.post("http://localhost:3000/artiste", this.artiste)
          .then(async () => {
            await Vue.axios.get("http://localhost:3000/artiste/last")
                .then(response => {
                  this.id = response.data.id
                })
                .catch(error => {
                  console.log(error)
                });
          })
          .then(async () => {
            for (const id_pays of this.id_pays) {
              await Vue.axios.post("http://localhost:3000/nationalite", {
                id_artiste: this.id,
                id_pays: id_pays
              })
                  .then(response => {
                    console.log(response)
                  })
                  .catch(error => {
                    console.log(error)
                  });
            }
          })
          .then(async () => {
            for (const id_genre of this.id_genres) {
              await Vue.axios.post("http://localhost:3000/fait", {
                id_artiste: this.id,
                id_genre: id_genre
              })
                  .then(response => {
                    console.log(response)
                  })
                  .catch(error => {
                    console.log(error)
                  });
            }
          })
          .then(() => {
            this.$router.push('/artiste')
          })
          .catch(error => {
            console.log(error)
          });
    },
  },
  created() {
    this.getCategories()
    this.getGenres()
    this.getPays()
  }
}
</script>

<style scoped>
@import '../../public/css/show.css';
</style>