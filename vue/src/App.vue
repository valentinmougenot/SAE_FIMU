<template>
  <v-app>
    <TopMenuBar
        v-if="showNavbars"
        :user="{identifiant: $session.get('identifiant'), role: $session.get('role')}"
        :items="['Déconnexion']"
        btnChange="Changer de saison"
        :saisonSelect="tab"
        @user-btn-click="userBtnClick"
        @switch-saison="switchSaison"
        @change-saison="changeSaison"
        ></TopMenuBar>
    <v-row>
      <v-col cols="12" sm="2" md="2" v-if="showNavbars">
          <SideMenuBar
            :data="menuData"
            title="Navigation"
            @select-item="selectItem"
            @change-saison="changeSaison"
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
import {post} from "@/services/axios.service.js";
import {mapActions, mapState} from "vuex";
export default {
  name: 'App',
  components: {
    SideMenuBar: () => import('@/components/SideMenuBar.vue'),
    TopMenuBar: () => import('@/components/TopMenuBar.vue'),
  },
  data: () => ({
    menuData: [],
  }),
  methods: {
    ...mapActions(['getArtistes', 'getScenes', "getTypescenes", "getCategories", "getGenres", "getPays", "getConcerts"]),
    logout() {
      post('utilisateur/logout')
          .then(() => {
            this.$router.push('/login');
          })
          .catch(error => {
            console.log(error)
          });
      },
    selectItem(index) {
      if (index === 0) {
        this.$router.push('/artiste');
      } else if (index === 1) {
        this.$router.push('/scene');
      } else if (index === 2) {
        this.$router.push('/concert');
      } else if (index === 3) {
        this.$router.push('/planning');
      } else if (index === 4) {
        this.$router.push('/categorie');
      } else if (index === 5) {
        this.$router.push('/genre');
      } else if (index === 6) {
        this.$router.push('/actualite');
      } else if (index === 7) {
        this.$router.push('/notification');
      } else if (index === 8) {
        this.$router.push('/stand');
      } else if (index === 9) {
        this.$router.push('/service');
      } else if (index === 10) {
        this.$router.push('/utilisateur');
      }
    },
    initMenuData() {
      if (this.$session.exists() && this.$session.get('role') === 'Administrateur') {
        this.menuData = [
          {text: 'Artistes', selected : false},
          {text: 'Scènes', selected: false},
          {text: 'Concerts', selected: false},
          {text: 'Planning', selected: false},
          {text: 'Catégories', selected: false},
          {text: 'Genres', selected: false},
          {text: 'Actualités', selected: false},
          {text: 'Notifications', selected: false},
          {text: 'Stands', selected: false},
          {text: 'Services', selected: false},
          {text: 'Gestion des utilisateurs', selected: false},
        ];
      }
      else {
        this.menuData = [
          {text: 'Artistes', selected : false},
          {text: 'Scènes', selected: false},
          {text: 'Concerts', selected: false},
          {text: 'Planning', selected: false},
          {text: 'Catégories', selected: false},
          {text: 'Genres', selected: false},
          {text: 'Actualités', selected: false},
          {text: 'Notifications', selected: false},
          {text: 'Stands', selected: false},
          {text: 'Services', selected: false},
        ];
      }
    },
    userBtnClick(index) {
      if (index === 0) {
        this.logout();
        this.$session.destroy();
      }
    },
    switchSaison() {
      if (confirm("Voulez-vous vraiment changer de saison ?")) {
        post('saison/migrate-data-previous')
            .then(() => {
              post('saison/migrate-data-current')
                  .then(() => {
                    window.location.reload();
                  })
                  .catch(error => {
                    alert(error.response.data.message);
                  });
            })
            .catch(error => {
              alert(error.response.data.message);
            });
      }
    },
    async changeSaison(id) {
      let data = {};
      if (id === 0) {
        data.saison = '';
        data.year = '';
        data.sselected = '';
      }
      else if (id === 1) {
        data.saison = '/next';
        data.year = '';
        data.sselected = '/next';
      }
      else {
        data.saison = '/previous';
        data.year = '/year/' + this.saison[id].annee.toString();
        data.sselected = '';
      }
      await this.$store.dispatch('selectSaison', data);
      await this.$store.dispatch('getArtistes');
      await this.$store.commit('updateScenes', []);
      await this.$store.commit('updateStands', []);
      await this.$store.commit('updateConcerts', []);
      this.$router.push('/artiste');
    }
   },
  computed: {
    ...mapState(['saison']),
    showNavbars() {
      return !this.$route.path.includes('/login');
    },
    tab() {
      if (this.saison.length === 0)
        return [];
      let tab = [];
      tab.push({
        text: "Saison " + this.saison[1].annee + " (actuelle)",
        value: 0
      })
      tab.push({
        text: "Saison " + this.saison[0].annee + " (suivante)",
        value: 1
      })
      for(let i = 2; i < this.saison.length; i++) {
        tab.push({
          text: "Saison " + this.saison[i].annee,
          value: i
        })
      }
      return tab;
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
      } else if (this.$route.path.includes('/concert')) {
        this.menuData[2].selected = true;
      }  else if (this.$route.path.includes('/planning')) {
        this.menuData[3].selected = true;
      } else if (this.$route.path.includes('/categorie')) {
        this.menuData[4].selected = true;
      } else if (this.$route.path.includes('/genre')) {
        this.menuData[5].selected = true;
      } else if (this.$route.path.includes('/actualite')) {
        this.menuData[6].selected = true;
      } else if (this.$route.path.includes('/notification')) {
        this.menuData[7].selected = true;
      } else if (this.$route.path.includes('/stand')) {
        this.menuData[8].selected = true;
      } else if (this.$route.path.includes('/service')) {
        this.menuData[9].selected = true;
      } else if (this.$route.path.includes('/utilisateur')) {
        this.menuData[10].selected = true;
      }
    },

  },
  async created() {
    if (this.saison.length === 0) {
      await this.$store.dispatch('getSaison');
    }
    this.initMenuData();
  },
};
</script>
<style scoped>

</style>
