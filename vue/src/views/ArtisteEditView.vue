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
              <v-form ref="form" lazy-validation>
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
                    v-model="artiste.nationalite"
                    :items="paysSelect"
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
                (+{{ artiste.nationalite.length - 2 }} autre<span v-if="artiste.nationalite.length - 2 > 1">s</span>)
                    </span>
                  </template>
                </v-select>
                <v-select
                    v-model="artiste.id_categorie"
                    :items="categoriesSelect"
                    label="Catégorie de l'artiste"
                    required
                ></v-select>
                <v-select
                    v-model="artiste.fait"
                    :items="genresSelect"
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
                (+{{ artiste.fait.length - 2 }} autre<span v-if="artiste.fait.length - 2 > 1">s</span>)
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
                    :items="reseauxsociauxSelect"
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
                    v-model="artiste.possede.find(p => p.id_reseaux_sociaux === id).lien"
                    :label="reseauxsociaux.find(r => r.id === id).libelle"
                ></v-text-field>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="editArtiste">Modifier</v-btn>
              </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import Vue from "vue";
import {mapState} from "vuex";
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
      fait: [],
      nationalite: [],
      possede: []
    },
    id_reseauxsociaux: [],
  }),
  methods: {
    async getArtiste() {
      return await Vue.axios.get("http://localhost:3000/artiste/" + this.$route.params.id)
          .then(response => {
            this.artiste.nom = response.data.nom,
            this.artiste.photo = response.data.photo,
            this.artiste.biographie = response.data.biographie,
            this.artiste.lien_video = response.data.lien_video,
            this.artiste.lien_site = response.data.lien_site,
            this.artiste.id_categorie = response.data.id_categorie,
            response.data.genres.forEach(genre => {
              this.artiste.fait.push(genre.id);
            })
            response.data.pays.forEach(pays => {
              this.artiste.nationalite.push(pays.id);
            })
            response.data.reseauxsociauxes.forEach(reseau => {
              this.id_reseauxsociaux.push(reseau.id);
              this.artiste.possede.find(p => p.id_reseaux_sociaux === reseau.id).lien = reseau.possede.lien;
            })
            console.log(this.artiste);
          })
          .catch(error => {
            alert(error.response.data.message);
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
            for(const id_genre of this.artiste.fait) {
              await Vue.axios.post("http://localhost:3000/fait", {
                id_artiste: this.$route.params.id,
                id_genre: id_genre,
              })
            }
          })
          .then(async () => {
            for(const id_pays of this.artiste.nationalite) {
              await Vue.axios.post("http://localhost:3000/nationalite", {
                id_artiste: this.$route.params.id,
                id_pays: id_pays,
              })
            }
          })
          .then(async () => {
            for(const possede of this.artiste.possede) {
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
            this.$store.dispatch('getArtistes');
            this.$router.push('/artiste');
          })
          .catch(error => {
            alert(error.response.data.message);
          });
    }
  },
  computed: {
    ...mapState(['categories', 'genres', 'pays', 'reseauxsociaux']),
    categoriesSelect() {
      return this.categories.map(categorie => {
        return {
          text: categorie.libelle,
          value: categorie.id
        }
      })
    },
    genresSelect() {
      return this.genres.map(genre => {
        return {
          text: genre.libelle,
          value: genre.id
        }
      })
    },
    paysSelect() {
      return this.pays.map(pays => {
        return {
          text: pays.libelle,
          value: pays.id
        }
      })
    },
    reseauxsociauxSelect() {
      return this.reseauxsociaux.map(rs => {
        return {
          text: rs.libelle,
          value: rs.id
        }
      })
    }
  },
  async created() {
    if (this.categories.length === 0) {
      await this.$store.dispatch('getCategories');
    }
    if (this.genres.length === 0) {
      await this.$store.dispatch('getGenres');
    }
    if (this.pays.length === 0) {
      await this.$store.dispatch('getPays');
    }
    if (this.reseauxsociaux.length === 0) {
      await this.$store.dispatch('getReseauxsociaux');
    }
    this.artiste.possede = this.reseauxsociaux.map(rs => {
      return {
        id_reseaux_sociaux: rs.id,
        lien: null
      }
    })
    await this.getArtiste();
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