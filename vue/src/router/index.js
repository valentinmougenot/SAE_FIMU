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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
