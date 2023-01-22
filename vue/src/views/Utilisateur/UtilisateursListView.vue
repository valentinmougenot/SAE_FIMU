<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="6">
        <v-text-field
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            label="Rechercher"
            outlined
            hide-details></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-select
            v-model="role"
            :items="rolesSelect"
            :height="56"
            chips
            label="Rôle"
            multiple
            outlined>
        </v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-btn
          class="ma-6 addDeleteBtn"
          :height="56"
          :href="'/utilisateur/add'"
          color="success">Ajouter utilisateur&emsp;<v-icon>mdi-plus-box-outline</v-icon>
      </v-btn>
    </v-row>
    <v-row>
      <TableList
        :data="filtres"
        :fields="['identifiant', 'rl']"
        :titles="['Identifiant', 'Role', 'Actions']"
        :buttons="[
          {icon: 'mdi-key-variant', color: 'warning'},
          {icon: 'mdi-pencil', color: 'primary'},
          {icon: 'mdi-delete', color: 'error'}
        ]"
        :pk="'identifiant'"
        @button-click="buttonClick"
        ></TableList>
    </v-row>
  </v-container>
</template>

<script>
import {get, remove} from "@/services/axios.service.js";
import {mapState} from "vuex";
export default {
  name: "UtilisateursListView",
  components: {
    TableList: () => import("@/components/TableList.vue"),
  },
  data: () => ({
    utilisateurs: [],
    search: "",
    role: [],
  }),
  methods: {
    async getUtilisateurs() {
      //pas dans le store car réservé aux admins
      await get("utilisateur")
          .then(response => {
            this.utilisateurs = response.data
            this.utilisateurs.forEach(user => {
              user.rl = user.role.libelle
            })
          })
          .catch(error => {
            console.log(error)
          });
    },
    utilisateursFiltres() {
      return this.utilisateurs.filter(utilisateur => {
        return utilisateur.identifiant.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    rolesFiltres() {
      if (this.role.length === 0) {
        return this.utilisateurs;
      }
      return this.utilisateurs.filter(utilisateur => {
        return this.role.includes(utilisateur.id_role)
      })
    },
    async deleteUtilisateur(id) {
       await remove("utilisateur/" + id)
          .then(() => {
            this.getUtilisateurs();
          })
          .catch(error => {
            alert(error.response.data.message);
          });
    },
    buttonClick(identifiant, buttonIndex) {
      switch (buttonIndex) {
        case 0:
          this.$router.push('/password/' + identifiant + '/edit');
          break;
        case 1:
          this.$router.push('/utilisateur/' + identifiant + '/edit');
          break;
        case 2:
          this.deleteUtilisateur(identifiant);
          break;
      }
    }
  },
  created() {
    this.getUtilisateurs();
    if (this.roles.length === 0) {
      this.$store.dispatch('getRoles')
    }
  },
  computed: {
    ...mapState(['roles']),
    filtres() {
      return this.utilisateursFiltres().filter(utilisateur => {
        return this.rolesFiltres().includes(utilisateur)
      })
    },
    rolesSelect() {
      return this.roles.map(role => {
        return {
          value: role.id,
          text: role.libelle
        }
      })
    }
  },
  beforeCreate() {
    if (!this.$session.exists()) {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
@import "@/../public/css/show.css";
</style>