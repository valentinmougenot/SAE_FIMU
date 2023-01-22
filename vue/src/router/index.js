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
    component: () => import('../views/Artiste/ArtistesListView.vue')
  },
  {
    path: '/artiste/add',
    name: 'artiste-add',
    component: () => import('../views/Artiste/ArtisteAddView.vue')
  },
  {
    path: '/artiste/:id',
    name: 'artiste-detail',
    component: () => import('../views/Artiste/ArtisteDetailView.vue')
  },
  {
    path: '/artiste/:id/edit',
    name: 'artiste-edit',
    component: () => import('../views/Artiste/ArtisteEditView.vue')
  },
  {
    path: '/scene',
    name: 'scene',
    component: () => import('../views/Scene/ScenesListView.vue')
  },
  {
    path: '/scene/add',
    name: 'scene-add',
    component: () => import('../views/Scene/SceneAddView.vue')
  },
  {
    path: '/scene/:id',
    name: 'scene-detail',
    component: () => import('../views/Scene/SceneDetailView.vue')
  },
  {
    path: '/scene/:id/edit',
    name: 'scene-edit',
    component: () => import('../views/Scene/SceneEditView.vue')
  },
  {
    path: '/categorie',
    name: 'categorie',
    component: () => import('../views/Categorie/CategoriesListView.vue')
  },
  {
    path: '/categorie/add',
    name: 'categorie-add',
    component: () => import('../views/Categorie/CategorieAddView.vue')
  },
  {
    path: '/categorie/:id/edit',
    name: 'categorie-edit',
    component: () => import('../views/Categorie/CategorieEditView.vue')
  },
  {
    path: '/genre',
    name: 'genre',
    component: () => import('../views/Genre/GenresListView.vue')
  },
  {
    path: '/genre/add',
    name: 'genre-add',
    component: () => import('../views/Genre/GenreAddView.vue')
  },
  {
    path: '/genre/:id/edit',
    name: 'genre-edit',
    component: () => import('../views/Genre/GenreEditView.vue')
  },
  {
    path: '/utilisateur',
    name: 'utilisateur',
    component: () => import('../views/Utilisateur/UtilisateursListView.vue')
  },
  {
    path: '/utilisateur/add',
    name: 'utilisateur-add',
    component: () => import('../views/Utilisateur/UtilisateurAddView.vue')
  },
  {
    path: '/utilisateur/:id/edit',
    name: 'utilisateur-edit',
    component: () => import('../views/Utilisateur/UtilisateurEditView.vue')
  },
  {
    path: '/password/:id/edit',
    name: 'password-edit',
    component: () => import('../views/Utilisateur/PasswordEditView.vue')
  },
  {
    path: '/concert',
    name: 'concert',
    component: () => import('../views/Concert/ConcertsListView.vue')
  },
  {
    path: '/concert/add',
    name: 'concert-add',
    component: () => import('../views/Concert/ConcertAddView.vue')
  },
  {
    path: '/concert/:id/edit',
    name: 'concert-edit',
    component: () => import('../views/Concert/ConcertEditView.vue')
  },
  {
    path: '/planning',
    name: 'planning',
    component: () => import('../views/Concert/PlanningView.vue')
  },
  {
    path: '/actualite',
    name: 'actualite',
    component: () => import('../views/Actualite/ActualitesView.vue')
  },
  {
    path: '/actualite/add',
    name: 'actualite-add',
    component: () => import('../views/Actualite/ActualiteAddView.vue')
  },
  {
    path: '/actualite/:id/edit',
    name: 'actualite-edit',
    component: () => import('../views/Actualite/ActualiteEditView.vue')
  },
  {
    path: '/notification',
    name: 'notification',
    component: () => import('../views/Notification/NotificationsView.vue')
  },
  {
    path: '/notification/add',
    name: 'notification-add',
    component: () => import('../views/Notification/NotificationAddView.vue')
  },
  {
    path: '/notification/:id/edit',
    name: 'notification-edit',
    component: () => import('../views/Notification/NotificationEditView.vue')
  },
  {
    path: '/stand',
    name: 'stand',
    component: () => import('../views/Stand/StandsListView.vue')
  },
  {
    path: '/stand/add',
    name: 'stand-add',
    component: () => import('../views/Stand/StandAddView.vue')
  },
  {
    path: '/stand/:id/edit',
    name: 'stand-edit',
    component: () => import('../views/Stand/StandEditView.vue')
  },
  {
    path: '/service',
    name: 'service',
    component: () => import('../views/Service/ServicesListView.vue')
  },
  {
    path: '/service/add',
    name: 'service-add',
    component: () => import('../views/Service/ServiceAddView.vue')
  },
  {
    path: '/service/:id/edit',
    name: 'service-edit',
    component: () => import('../views/Service/ServiceEditView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
