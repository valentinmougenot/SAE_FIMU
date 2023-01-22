import Vue from 'vue'
import Vuex from 'vuex'
import {get} from '@/services/axios.service'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    artistes: [],
    scenes: [],
    typescenes: [],
    categories: [],
    genres: [],
    pays: [],
    actualites: [],
    typeactu: [],
    notifications: [],
    stands: [],
    typestands: [],
    services: [],
    reseauxsociaux: [],
    saison: [],
    roles: [],
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
    },
    updateRoles(state, roles) {
        state.roles = roles
    }
  },
  actions: {
      async getArtistes({commit}) {
          await get(`${this.state.saisonSelected}/artiste${this.state.yearSelected}`)
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
          await get(`${this.state.sselected}/scene`)
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
          await get("/typescene")
              .then(response => {
                  commit('updateTypescenes', response.data)
              })
              .catch(error => {
                  console.log(error)
              });
      },
      async getCategories({commit}) {
          await get("/categorie")
              .then(response => {
                  commit('updateCategories', response.data)
              })
              .catch(error => {
                  console.log(error)
              });
      },
      async getGenres({commit}) {
          await get("/genre")
              .then(response => {
                  commit('updateGenres', response.data)
              })
              .catch(error => {
                  console.log(error)
              });
      },
      async getPays({commit}) {
          await get("/pays")
              .then(response => {
                  commit('updatePays', response.data)
              })
              .catch(error => {
                  console.log(error)
              });
      },
      async getActualites({commit}) {
          await get("/actualite")
              .then(response => {
                  commit('updateActualites', response.data)
              })
              .catch(error => {
                  console.log(error)
              });
      },
      async getTypeactu({commit}) {
          await get("/typeactu")
              .then(response => {
                  commit('updateTypeactu', response.data)
              })
              .catch(error => {
                  console.log(error)
              });
      },
      async getNotifications({commit}) {
          await get("/notification")
              .then(response => {
                  commit('updateNotifications', response.data)
              })
              .catch(error => {
                  console.log(error)
              });
      },
      async getStands({commit}) {
          await get(`${this.state.sselected}/stand`)
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
          await get("/typestand")
              .then(response => {
                  commit('updateTypestands', response.data)
              })
              .catch(error => {
                      console.log(error)
                  }
              );
      },
      async getServices({commit}) {
          await get("/service")
              .then(response => {
                  commit('updateServices', response.data)
              })
              .catch(error => {
                  console.log(error)
              });
      },
      async getReseauxsociaux({commit}) {
          await get("/reseauxsociaux")
              .then(response => {
                  commit('updateReseauxsociaux', response.data)
              })
              .catch(error => {
                  console.log(error)
              });
      },
        async getSaison({commit}) {
            await get("/saison")
                .then(response => {
                    commit('updateSaison', response.data)
                })
                .catch(error => {
                    console.log(error)
                });
        },
        async getRoles({commit}) {
            await get("/role")
                .then(response => {
                    commit('updateRoles', response.data)
                })
                .catch(error => {
                    console.log(error)
                });
        },
      selectSaison({commit}, data) {
        commit('updateSaisonSelected', data.saison);
        commit('updateYearSelected', data.year);
        commit('updateSselected', data.sselected);
      }
  },
  modules: {
  }
})
