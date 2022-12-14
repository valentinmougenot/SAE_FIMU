import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/artiste',
    name: 'artiste',
    component: () => import('../views/ArtistesListView.vue')
  },
  {
    path: '/artiste/add',
    name: 'artiste-add',
    component: () => import('../views/ArtisteAddView.vue')
  },
  {
    path: '/artiste/:id',
    name: 'artiste-detail',
    component: () => import('../views/ArtisteDetailView.vue')
  },
  {
    path: '/artiste/:id/edit',
    name: 'artiste-edit',
    component: () => import('../views/ArtisteEditView.vue')
  },
  {
    path: '/scene',
    name: 'scene',
    component: () => import('../views/ScenesListView.vue')
  },
  {
    path: '/scene/add',
    name: 'scene-add',
    component: () => import('../views/SceneAddView.vue')
  },
  {
    path: '/scene/:id',
    name: 'scene-detail',
    component: () => import('../views/SceneDetailView.vue')
  },
  {
    path: '/scene/:id/edit',
    name: 'scene-edit',
    component: () => import('../views/SceneEditView.vue')
  },
  {
    path: '/categorie',
    name: 'categorie',
    component: () => import('../views/CategoriesListView.vue')
  },
  {
    path: '/categorie/add',
    name: 'categorie-add',
    component: () => import('../views/CategorieAddView.vue')
  },
  {
    path: '/categorie/:id/edit',
    name: 'categorie-edit',
    component: () => import('../views/CategorieEditView.vue')
  },
  {
    path: '/genre',
    name: 'genre',
    component: () => import('../views/GenresListView.vue')
  },
  {
    path: '/genre/add',
    name: 'genre-add',
    component: () => import('../views/GenreAddView.vue')
  },
  {
    path: '/genre/:id/edit',
    name: 'genre-edit',
    component: () => import('../views/GenreEditView.vue')
  },
  {
    path: '/utilisateur',
    name: 'utilisateur',
    component: () => import('../views/UtilisateursListView.vue')
  },
  {
    path: '/utilisateur/add',
    name: 'utilisateur-add',
    component: () => import('../views/UtilisateurAddView.vue')
  },
  {
    path: '/utilisateur/:id/edit',
    name: 'utilisateur-edit',
    component: () => import('../views/UtilisateurEditView.vue')
  },
  {
    path: '/password/:id/edit',
    name: 'password-edit',
    component: () => import('../views/PasswordEditView.vue')
  },
  {
    path: '/concert',
    name: 'concert',
    component: () => import('../views/ConcertsView.vue')
  },
  {
    path: '/concert/add',
    name: 'concert-add',
    component: () => import('../views/ConcertAddView.vue')
  },
  {
  path: '/concert/:id',
  name: 'concert-detail',
  component: () => import('../views/ConcertDetailView.vue')
  },
  {
    path: '/concert/:id/edit',
    name: 'concert-edit',
    component: () => import('../views/ConcertEditView.vue')
  },
  {
    path: '/actualite',
    name: 'actualite',
    component: () => import('../views/./ActualitesView')
  },
  {
    path: '/actualite/add',
    name: 'actualite-add',
    component: () => import('../views/ActualiteAddView.vue')
  },
  {
    path: '/actualite/:id/edit',
    name: 'actualite-edit',
    component: () => import('../views/ActualiteEditView.vue')
  },
  {
    path: '/notification',
    name: 'notification',
    component: () => import('../views/./NotificationsView')
  },
  {
    path: '/notification/add',
    name: 'notification-add',
    component: () => import('../views/NotificationAddView.vue')
  },
  {
    path: '/notification/:id/edit',
    name: 'notification-edit',
    component: () => import('../views/NotificationEditView.vue')
  },
  {
    path: '/stand',
    name: 'stand',
    component: () => import('../views/./StandsListView')
  },
  {
    path: '/stand/add',
    name: 'stand-add',
    component: () => import('../views/StandAddView.vue')
  },
  {
    path: '/stand/:id/edit',
    name: 'stand-edit',
    component: () => import('../views/StandEditView.vue')
  },
  {
    path: '/service',
    name: 'service',
    component: () => import('../views/./ServicesListView')
  },
  {
    path: '/service/add',
    name: 'service-add',
    component: () => import('../views/ServiceAddView.vue')
  },
  {
    path: '/service/:id/edit',
    name: 'service-edit',
    component: () => import('../views/ServiceEditView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
