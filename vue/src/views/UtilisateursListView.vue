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
            :items="roles"
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
          v-model="ajouter"
          class="ma-6 addDeleteBtn"
          :height="56"
          :href="'/utilisateur/add'"
          color="success">Ajouter utilisateur&emsp;<v-icon>mdi-plus-box-outline</v-icon>
      </v-btn>
    </v-row>
    <v-row>
      <table class="listing">
        <thead>
        <tr>
          <th>Identifiant</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="user in filtres" :key="user.id">
            <td>{{user.identifiant}}</td>
            <td>{{user.role.libelle}}</td>
            <td>
              <v-btn class="ma-1" color="warning" :href="'/password/' + user.identifiant + '/edit'"><v-icon>mdi-key-variant</v-icon></v-btn>
              <v-btn class="ma-1" color="primary" :href="'/utilisateur/' + user.identifiant + '/edit'"><v-icon>mdi-pencil</v-icon></v-btn>
              <v-btn class="ma-1" color="error" @click="deleteUtilisateur(user.identifiant)"><v-icon>mdi-delete</v-icon></v-btn>
            </td>
          </tr>
        </tbody>
      </table>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "UtilisateursListView",
  data: () => ({
    utilisateurs: [],
    roles: [],
    search: "",
    role: [],
  }),
  methods: {
    async getUtilisateurs() {
      return await axios.get("http://localhost:3000/utilisateur")
          .then(response => {
            this.utilisateurs = response.data
          })
          .catch(error => {
            console.log(error)
          });
    },
    async getRoles() {
      return await axios.get("http://localhost:3000/role")
          .then(response => {
            response.data.forEach(role => {
              this.roles.push(role.libelle)
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
        return this.role.includes(utilisateur.role.libelle)
      })
    },
    deleteUtilisateur(id) {
      return axios.delete("http://localhost:3000/utilisateur/" + id)
          .then(() => {
            this.getUtilisateurs();
          })
          .catch(error => {
            console.log(error)
          });
    },
  },
  created() {
    this.getUtilisateurs();
    this.getRoles();
  },
  computed: {
    filtres() {
      return this.utilisateursFiltres().filter(utilisateur => {
        return this.rolesFiltres().includes(utilisateur)
      })
    }
  }
}
</script>

<style scoped>
@import "../../public/css/show.css";
</style>