<template>
  <v-app>
    <TopMenuBar
        v-if="showNavbars"
        :user="{identifiant: $session.get('identifiant'), role: $session.get('role')}"
        :items="['Déconnexion']"
        @user-btn-click="userBtnClick"
        ></TopMenuBar>
    <v-row>
      <v-col cols="12" sm="2" md="2" v-if="showNavbars">
          <SideMenuBar
            :data="menuData"
            title="Navigation"
            @select-item="selectItem"
            @logout="logout"
          ></SideMenuBar>
      </v-col>
      <v-col cols="12" sm="10" md="10" v-if="showNavbars">
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
import Vue from 'vue';
export default {
  name: 'App',
  components: {
    SideMenuBar: () => import('@/components/SideMenuBar.vue'),
    TopMenuBar: () => import('@/components/TopMenuBar.vue'),
  },
  data: () => ({
    menuData: []
  }),
  methods: {
    logout() {
      Vue.axios.post('http://localhost:3000/utilisateur/logout')
          .then(() => {
            this.$router.push('/login');
          })
          .catch(error => {
            console.log(error)
          });
      },
    selectItem(index) {
      if (index === 0 && this.$route.path !== '/artiste') {
        this.$router.push('/artiste');
      } else if (index === 1 && this.$route.path !== '/scene') {
        this.$router.push('/scene');
      } else if (index === 2 && this.$route.path !== '/categorie') {
        this.$router.push('/categorie');
      } else if (index === 3 && this.$route.path !== '/genre') {
        this.$router.push('/genre');
      } else if (index === 4 && this.$route.path !== '/utilisateur') {
        this.$router.push('/utilisateur');
      }
    },
    initMenuData() {
      if (this.$session.exists() && this.$session.get('role') === 'Administrateur') {
        this.menuData = [
          {text: 'Artistes', selected : false},
          {text: 'Scènes', selected: false},
          {text: 'Catégories', selected: false},
          {text: 'Genres', selected: false},
          {text: 'Gestion des utilisateurs', selected: false},
        ];
      }
      else {
        this.menuData = [
          {text: 'Artistes', selected : false},
          {text: 'Scènes', selected: false},
          {text: 'Catégories', selected: false},
          {text: 'Genres', selected: false},
        ];
      }
    },
    userBtnClick(index) {
      if (index === 0) {
        this.logout();
        this.$session.destroy();
      }
    },
   },
  computed: {
    showNavbars() {
      return !this.$route.path.includes('/login');
    },
  },
  watch:{
    $route () {
      this.menuData.forEach(item => {
        item.selected = false;
      });
      if (this.$route.path.includes('/artiste')) {
        this.menuData[0].selected = true;
      } else if (this.$route.path.includes('/scene')) {
        this.menuData[1].selected = true;
      } else if (this.$route.path.includes('/categorie')) {
        this.menuData[2].selected = true;
      } else if (this.$route.path.includes('/genre')) {
        this.menuData[3].selected = true;
      } else if (this.$route.path.includes('/utilisateur')) {
        this.menuData[4].selected = true;
      }
    },

  },
  mounted() {
    this.initMenuData();
  }
};
</script>
<style scoped>

</style>
