import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    artistes: [],
    scenes: [],
    typescenes: [],
    categories: [],
    genres: [],
    pays: [],
    concerts: [],
    actualites: [],
    typeactu: [],
    notifications: [],
    stands: [],
    typestands: [],
    services: [],
    reseauxsociaux: [],
    saison: [],
    saisonSelected: "",
    yearSelected: "",
    sselected: "" // "next" si next, "" si autre
  },
  getters: {
  },
  mutations: {
    updateArtistes(state, artistes) {
        state.artistes = artistes
    },
    updateScenes(state, scenes) {
        state.scenes = scenes
    },
    updateTypescenes(state, typescenes) {
        state.typescenes = typescenes
    },
    updateCategories(state, categories) {
        state.categories = categories
    },
    updateGenres(state, genres) {
        state.genres = genres
    },
    updatePays(state, pays) {
        state.pays = pays
    },
    updateConcerts(state, concerts) {
        state.concerts = concerts
    },
    updateActualites(state, actualites) {
        state.actualites = actualites
    },
    updateTypeactu(state, typeactu) {
        state.typeactu = typeactu
    },
    updateNotifications(state, notifications) {
        state.notifications = notifications
    },
    updateStands(state, stands) {
        state.stands = stands
    },
    updateTypestands(state, typestands) {
        state.typestands = typestands
    },
    updateServices(state, services) {
        state.services = services
    },
    updateReseauxsociaux(state, reseauxsociaux) {
        state.reseauxsociaux = reseauxsociaux
    },
    updateSaison(state, saison) {
        state.saison = saison
    },
    updateSaisonSelected(state, saisonSelected) {
        state.saisonSelected = saisonSelected
    },
    updateYearSelected(state, yearSelected) {
        state.yearSelected = yearSelected
    },
    updateSselected(state, sselected) {
        state.sselected = sselected
    }
  },
  actions: {
      async getArtistes({commit}) {
          await Vue.axios.get(`http://localhost:3000${this.state.saisonSelected}/artiste${this.state.yearSelected}`)
              .then(response => {
                  response.data.forEach(artiste => {
                      artiste.cl = artiste.category.libelle
                      artiste.gl = artiste.genres.map(genre => genre.libelle).join(', ')
                      artiste.pl = artiste.pays.map(pays => pays.libelle).join(', ')
                  })
                  commit('updateArtistes', response.data)
              })
              .catch(error => {
                  console.log(error)
              });
      },
      async getScenes({commit}) {
          await Vue.axios.get(`http://localhost:3000${this.state.sselected}/scene`)
              .then(response => {
                  response.data.forEach(scene => {
                      scene.tsl = scene.typescene.libelle
                  })
                  commit('updateScenes', response.data)
              })
              .catch(error => {
                  console.log(error)
              });
      },
      async getTypescenes({commit}) {
          await Vue.axios.get("http://localhost:3000/typescene")
              .then(response => {
                  commit('updateTypescenes', response.data)
              })
              .catch(error => {
                  console.log(error)
              });
      },
      async getCategories({commit}) {
          await Vue.axios.get("http://localhost:3000/categorie")
              .then(response => {
                  commit('updateCategories', response.data)
              })
              .catch(error => {
                  console.log(error)
              });
      },
      async getGenres({commit}) {
          await Vue.axios.get("http://localhost:3000/genre")
              .then(response => {
                  commit('updateGenres', response.data)
              })
              .catch(error => {
                  console.log(error)
              });
      },
      async getPays({commit}) {
          await Vue.axios.get("http://localhost:3000/pays")
              .then(response => {
                  commit('updatePays', response.data)
              })
              .catch(error => {
                  console.log(error)
              });
      },
      async getConcerts({commit}) {
          console.log(`http://localhost:3000${this.state.sselected}/concert`)
          await Vue.axios.get(`http://localhost:3000${this.state.sselected}/concert`)
              .then(response => {
                  response.data.map(concert => {
                      return {
                          id: concert.id,
                          id_scene: concert.id_scene,
                          artiste: concert.artiste.nom,
                          heureDebut: parseInt(concert.date_debut.slice(0, 2)),
                          minuteDebut: parseInt(concert.date_debut.slice(3, 5)),
                          duree: concert.duree / 15,
                          couleur: concert.artiste.category.couleur,
                          genres: concert.artiste.genres.map(genre => genre.libelle)
                      }
                  })
                  commit('updateConcerts', response.data)
              })
              .catch(error => {
                  console.log(error)
              });
      },
      async getActualites({commit}) {
          await Vue.axios.get("http://localhost:3000/actualite")
              .then(response => {
                  commit('updateActualites', response.data)
              })
              .catch(error => {
                  console.log(error)
              });
      },
      async getTypeactu({commit}) {
          await Vue.axios.get("http://localhost:3000/typeactu")
              .then(response => {
                  commit('updateTypeactu', response.data)
              })
              .catch(error => {
                  console.log(error)
              });
      },
      async getNotifications({commit}) {
          await Vue.axios.get("http://localhost:3000/notification")
              .then(response => {
                  commit('updateNotifications', response.data)
              })
              .catch(error => {
                  console.log(error)
              });
      },
      async getStands({commit}) {
          await Vue.axios.get(`http://localhost:3000${this.state.sselected}/stand`)
              .then(response => {
                  response.data.forEach(stand => {
                      stand.tsl = stand.typestand.libelle
                      stand.tsr = stand.services.map(service => service.libelle).join(', ')
                  });
                  commit('updateStands', response.data)
              })
              .catch(error => {
                  console.log(error)
              });
      },
      async getTypestands({commit}) {
          await Vue.axios.get("http://localhost:3000/typestand")
              .then(response => {
                  commit('updateTypestands', response.data)
              })
              .catch(error => {
                      console.log(error)
                  }
              );
      },
      async getServices({commit}) {
          await Vue.axios.get("http://localhost:3000/service")
              .then(response => {
                  commit('updateServices', response.data)
              })
              .catch(error => {
                  console.log(error)
              });
      },
      async getReseauxsociaux({commit}) {
          await Vue.axios.get("http://localhost:3000/reseauxsociaux")
              .then(response => {
                  commit('updateReseauxsociaux', response.data)
              })
              .catch(error => {
                  console.log(error)
              });
      },
        async getSaison({commit}) {
            await Vue.axios.get("http://localhost:3000/saison")
                .then(response => {
                    commit('updateSaison', response.data)
                })
                .catch(error => {
                    console.log(error)
                });
        },
      selectSaison({commit}, data) {
          console.log(data)
        commit('updateSaisonSelected', data.saison);
        commit('updateYearSelected', data.year);
        commit('updateSselected', data.sselected);
      }
  },
  modules: {
  }
})
