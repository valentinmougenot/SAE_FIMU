<template>
  <v-container>
    <v-form>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>
              <h1 class="display-1">Modifier un artiste</h1>
            </v-card-title>
            <v-card-text>
              <v-text-field
                  v-model="artiste.nom"
                  label="Nom de l'artiste"
                  required
              ></v-text-field>
              <v-text-field
                  v-model="artiste.photo"
                  label="Photo de l'artiste"
                  required
              ></v-text-field>
              <v-select
                  v-model="id_pays"
                  :items="pays"
                  label="Origine de l'artiste"
                  multiple
                  chips
                  required
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
              <v-select
                  v-model="artiste.id_categorie"
                  :items="categories"
                  label="Catégorie de l'artiste"
                  required
              ></v-select>
              <v-select
                  v-model="id_genres"
                  :items="genres"
                  label="Genres de l'artiste"
                  multiple
                  chips
                  required
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
              <v-text-field
                  v-model="artiste.lien_video"
                  label="Lien vidéo Youtube de l'artiste"
                  required
              ></v-text-field>
              <v-text-field
                  v-model="artiste.lien_site"
                  label="Lien site Web de l'artiste"
                  required
              ></v-text-field>
              <v-text-field
                  v-model="artiste.biographie"
                  label="Description de l'artiste"
                  required
              ></v-text-field>
              <v-select
                  v-model="id_reseauxsociaux"
                  :items="reseauxsociaux"
                  label="Réseaux sociaux de l'artiste"
                  multiple
                  chips
                  required
              >
                <template v-slot:selection="{ item, index }">
                  <v-chip v-if="index <= 1">
                    <span>{{ item.text }}</span>
                  </v-chip>
                  <span
                      v-if="index === 2"
                      class="grey--text text-caption"
                  >
                (+{{ id_reseauxsociaux.length - 2 }} autre<span v-if="id_reseauxsociaux .length - 2 > 1">s</span>)
                </span>
                </template>
              </v-select>
              <v-text-field
                  v-for="(id, i) in id_reseauxsociaux" :key="i"
                  v-model="possede.find(p => p.id_reseaux_sociaux === id).lien"
                  :label="reseauxsociaux.find(x => x.value === id).text"
              ></v-text-field>
              <v-btn
                  color="primary"
                  class="addDeleteBtn"
                  :height="56"
                  @click="editArtiste()"
              >
                Modifier
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import Vue from "vue";
export default {
  name: "ArtisteEditView",
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
    reseauxsociaux: [],
    id_genres: [],
    id_pays: [],
    id_reseauxsociaux: [],
    possede: [],
  }),
  methods: {
    async getArtiste() {
      return await Vue.axios.get("http://localhost:3000/artiste/" + this.$route.params.id)
          .then(response => {
            this.artiste = {
              nom: response.data.nom,
              photo: response.data.photo,
              biographie: response.data.biographie,
              lien_video: response.data.lien_video,
              lien_site: response.data.lien_site,
              id_categorie: response.data.id_categorie,
            };
            response.data.genres.forEach(genre => {
              this.id_genres.push(genre.id);
            })
            response.data.pays.forEach(pays => {
              this.id_pays.push(pays.id);
            })
            response.data.reseauxsociauxes.forEach(reseau => {
              this.id_reseauxsociaux.push(reseau.id);
              this.possede.push({
                id_reseaux_sociaux: reseau.id,
                lien: reseau.possede.lien,
              })
            })
          })
          .catch(error => {
            console.log(error)
          });
    },
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
      return await Vue.axios.get("http://localhost:3000/pays")
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
    async getReseauxSociaux() {
      return await Vue.axios.get("http://localhost:3000/reseauxsociaux")
          .then(response => {
            this.reseauxsociaux = response.data.map(reseauxsociaux => {
              return {
                value: reseauxsociaux.id,
                text: reseauxsociaux.libelle,
              }
            })
            response.data.forEach(reseau => {
              if (!this.possede.find(p => p.id_reseaux_sociaux === reseau.id)) {
                this.possede.push({
                  id_reseaux_sociaux: reseau.id,
                  lien: null,
                })
              }
            })
          })
          .catch(error => {
            console.log(error)
          });
    },
    async editArtiste() {
      if (this.artiste.lien_video && this.artiste.lien_video.length === 0) {
        this.artiste.lien_video = null;
      }
      if (this.artiste.lien_site && this.artiste.lien_site.length === 0) {
        this.artiste.lien_site = null;
      }
      return await Vue.axios.put("http://localhost:3000/artiste/" + this.$route.params.id, this.artiste)
          .then(async () => {
            await Vue.axios.delete("http://localhost:3000/fait/artiste/" + this.$route.params.id);
          })
          .then(async () => {
            await Vue.axios.delete("http://localhost:3000/nationalite/artiste/" + this.$route.params.id);
          })
          .then(async () => {
            await Vue.axios.delete("http://localhost:3000/possede/artiste/" + this.$route.params.id);
          })
          .then(async () => {
            for(const id_genre of this.id_genres) {
              await Vue.axios.post("http://localhost:3000/fait", {
                id_artiste: this.$route.params.id,
                id_genre: id_genre,
              })
            }
          })
          .then(async () => {
            for(const id_pays of this.id_pays) {
              await Vue.axios.post("http://localhost:3000/nationalite", {
                id_artiste: this.$route.params.id,
                id_pays: id_pays,
              })
            }
          })
          .then(async () => {
            for(const possede of this.possede) {
              if (this.id_reseauxsociaux.includes(possede.id_reseaux_sociaux)) {
                await Vue.axios.post("http://localhost:3000/possede", {
                  idArtiste: this.$route.params.id,
                  idReseauxSociaux: possede.id_reseaux_sociaux,
                  lien: possede.lien,
                })
              }
            }
          })
          .then(() => {
            this.$router.push('/artiste');
          })
          .catch(error => {
            console.log(error)
          });
    }
  },
  mounted() {
    this.getCategories();
    this.getGenres();
    this.getPays();
    this.getArtiste()
        .then(() => {
          this.getReseauxSociaux();
        })
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