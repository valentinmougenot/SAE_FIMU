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
          try {
              const response = await get(`/artiste?incConcert=false${this.state.yearSelected}`, {headers: {'saison': this.state.saisonSelected}})
              response.data.data.forEach(artiste => {
                  artiste.cl = artiste.categorie.libelle
                  artiste.gl = artiste.genres.map(genre => genre.libelle).join(', ')
                  artiste.pl = artiste.pays.map(pays => pays.libelle).join(', ')
              })
              commit('updateArtistes', response.data.data)
          }
          catch (error) {
              console.log(error)
          }
      },
      async getScenes({commit}) {
          try {
                const response = await get(`/scene${this.state.yearSelected}`, {headers: {'saison': this.state.saisonSelected}})
                response.data.data.forEach(scene => {
                    scene.tsl = scene.typescene.libelle
                })
                commit('updateScenes', response.data.data)
          }
            catch (error) {
                console.log(error)
            }
      },
      async getTypescenes({commit}) {
          try {
            const response = await get("/typescene")
            commit('updateTypescenes', response.data.data)
          }
            catch (error) {
                console.log(error)
            }
      },
      async getCategories({commit}) {
          try {
            const response = await get("/categorie")
            commit('updateCategories', response.data.data)
          }
            catch (error) {
              console.log(error)
            }
      },
      async getGenres({commit}) {
          try {
            const response = await get("/genre")
            commit('updateGenres', response.data.data)
          }
            catch (error) {
                console.log(error)
            }
      },
      async getPays({commit}) {
          try {
            const response = await get("/pays")
            commit('updatePays', response.data.data)
          }
            catch (error) {
                console.log(error)
            }
      },
      async getActualites({commit}) {
          try {
            const response = await get("/actualite")
            commit('updateActualites', response.data.data)
          }
            catch (error) {
                console.log(error)
            }
      },
      async getTypeactu({commit}) {
          try {
            const response = await get("/typeactu")
            commit('updateTypeactu', response.data.data)
          }
            catch (error) {
                console.log(error)
            }
      },
      async getNotifications({commit}) {
          try {
            const response = await get("/notification")
            commit('updateNotifications', response.data.data)
          }
            catch (error) {
                console.log(error)
            }
      },
      async getStands({commit}) {
          try {
            const response = await get("/stand", {headers: {'saison': this.state.saisonSelected}})
            response.data.data.forEach(stand => {
                stand.tsl = stand.typestand.libelle
                stand.tsr = stand.services.map(service => service.libelle).join(', ')
            });
            commit('updateStands', response.data.data)
          }
            catch (error) {
                console.log(error)
            }
      },
      async getTypestands({commit}) {
          try {
            const response = await get("/typestand")
            commit('updateTypestands', response.data.data)
          }
            catch (error) {
                console.log(error)
            }
      },
      async getServices({commit}) {
          try {
            const response = await get("/service")
            commit('updateServices', response.data.data)
          }
            catch (error) {
                console.log(error)
            }
      },
      async getReseauxsociaux({commit}) {
          try {
            const response = await get("/reseauxsociaux")
            commit('updateReseauxsociaux', response.data.data)
          }
            catch (error) {
                console.log(error)
            }
      },
        async getSaison({commit}) {
          try {
            const response = await get("/saison");
            commit('updateSaison', response.data.data)
          }
          catch (error) {
            console.log(error)
          }
        },
        async getRoles({commit}) {
          try {
            const response = await get("/role");
            commit('updateRoles', response.data.data)
          }
          catch (error) {
            console.log(error)
          }
        },
      selectSaison({commit}, data) {
        commit('updateSaisonSelected', data.saison);
        commit('updateYearSelected', data.year);
      }
  },
  modules: {
  }
})
