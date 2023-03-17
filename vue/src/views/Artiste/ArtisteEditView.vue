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
                    v-model="artiste.pays"
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
                (+{{ artiste.pays.length - 2 }} autre<span v-if="artiste.pays.length - 2 > 1">s</span>)
                    </span>
                  </template>
                </v-select>
                <v-select
                    v-model="artiste.categorieId"
                    :items="categoriesSelect"
                    label="Catégorie de l'artiste"
                    required
                ></v-select>
                <v-select
                    v-model="artiste.genres"
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
                (+{{ artiste.genres.length - 2 }} autre<span v-if="artiste.genres.length - 2 > 1">s</span>)
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
                    v-model="artiste.rs.find(p => p.id === id).lien"
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
import {get, put} from "@/services/axios.service.js";
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
      categorieId: null,
      genres: [],
      pays: [],
      rs: []
    },
    id_reseauxsociaux: [],
  }),
  methods: {
    async getArtiste() {
      await get("artiste/" + this.$route.params.id, {headers: {'saison': this.$store.state.saisonSelected}})
          .then(response => {
            this.artiste.nom = response.data.data.nom
            this.artiste.photo = response.data.data.photo
            this.artiste.biographie = response.data.data.biographie
            this.artiste.lien_video = response.data.data.lien_video
            this.artiste.lien_site = response.data.data.lien_site
            this.artiste.categorieId = response.data.data.categorieId
            response.data.data.genres.forEach(genre => {
              this.artiste.genres.push(genre.id);
            })
            response.data.data.pays.forEach(pays => {
              this.artiste.pays.push(pays.id);
            })
            response.data.data.reseauxSociauxes.forEach(reseau => {
              this.id_reseauxsociaux.push(reseau.id);
              this.artiste.rs.find(p => p.id === reseau.id).lien = reseau.possede.lien;
            })
            console.log(this.artiste);
          })
          .catch(error => {
            alert(error.response.data.message);
          });
    },
    async editArtiste() {
      for (let i = this.artiste.rs.length - 1; i >= 0; i--) {
        if (!this.id_reseauxsociaux.includes(this.artiste.rs[i].id)) {
          this.artiste.rs.splice(i, 1);
        }
      }
      put(`artiste/${this.$route.params.id}`, this.artiste, {headers: {'saison': this.$store.state.saison}})
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
    this.artiste.rs = this.reseauxsociaux.map(rs => {
      return {
        id: rs.id,
        lien: null
      }
    })
    await this.getArtiste();
  }
}
</script>

<style scoped>

</style>