<template>
  <v-app>
    <v-row>
      <v-col cols="12" sm="2" md="2" v-if="showSidebar">
        <div class="sidebar">
          <v-list>
            <v-list-item>
              <v-list-item-content style="text-align: center">
                <v-list-item-title class="title">Navigation</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <div class="nav-items pa-4">
              <v-list-item class="item" :class="{selected: artisteActive}" :href="'/artiste'">
                <v-list-item-content>
                  <v-list-item-title class="title"><span class="item-text">Artistes</span></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item class="item" :class="{selected: sceneActive}" :href="'/scene'">
                <v-list-item-content>
                  <v-list-item-title class="title"><span class="item-text">Scènes</span></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item class="item" :class="{selected: categorieActive}" :href="'/categorie'">
                <v-list-item-content>
                  <v-list-item-title class="title"><span class="item-text">Catégories</span></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item class="item" :class="{selected: genreActive}" :href="'/genre'">
                <v-list-item-content>
                  <v-list-item-title class="title"><span class="item-text">Genres</span></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item class="item" :class="{selected: utilisateurActive}" :href="'/utilisateur'">
                <v-list-item-content>
                  <v-list-item-title class="title"><span class="item-text">Gestion des utilisateurs</span></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-btn
                color="primary"
                @click="logout()">Logout</v-btn>
              </v-list-item>
            </div>
          </v-list>
        </div>
      </v-col>
      <v-col cols="12" sm="10" md="10" v-if="showSidebar">
        <v-main>
          <router-view/>
        </v-main>
      </v-col>
      <v-col cols="12" sm="12" md="12" v-else>
        <v-main>
          <router-view/>
        </v-main>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',

  data: () => ({
    artisteActive: false,
    sceneActive: false,
    categorieActive: false,
    genreActive: false,
    utilisateurActive: false,
    showSidebar: true,
  }),
 methods: {
    setActive() {
      const path = window.location.pathname;
      this.showSidebar = path !== '/login';
      if (path.includes('artiste')) {
        this.artisteActive = true;
      } else if (path.includes('scene')) {
        this.sceneActive = true;
      } else if (path.includes('categorie')) {
        this.categorieActive = true;
      } else if (path.includes('genre')) {
        this.genreActive = true;
      } else if (path.includes('utilisateur')) {
        this.utilisateurActive = true;
      }
    },
    logout() {
      axios.post('http://localhost:3000/utilisateur/logout')
          .then(() => {
            this.$router.push('/login');
          })
          .catch(error => {
            console.log(error)
          });
    },
 },
  updated() {
    this.setActive();
  },
};
</script>
<style scoped>
@import '../public/css/navbar.css';
</style>
