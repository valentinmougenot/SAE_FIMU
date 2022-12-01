<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h1 class="display-1">Modifier un utilisateur</h1>
          </v-card-title>
          <v-card-text>
            <v-text-field
                v-model="this.$route.params.id"
                readonly
                required
            ></v-text-field>
            <v-select
                v-model="id_role"
                :items="roles"
                label="Rôle de l'utilisateur"
                required>
            </v-select>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="editUtilisateur">Modifier</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from "vue";
export default {
  name: "UtilisateurEditView",
  data: () => ({
    id_role: null,
    roles: [],
  }),
  methods: {
    getRoles() {
      return Vue.axios.get("http://localhost:3000/role")
        .then(response => {
          this.roles = response.data.map(role => {
            return {
              text: role.libelle,
              value: role.id
            }});
            console.log(this.roles);
          })
        .catch(error => {
          console.log(error);
        });
    },
    getUtilisateur() {
      return Vue.axios.get("http://localhost:3000/utilisateur/" + this.$route.params.id)
        .then(response => {
          this.id_role = response.data.id_role;
        })
        .catch(error => {
          console.log(error);
        });
    },
    editUtilisateur() {
      return Vue.axios
        .put("http://localhost:3000/utilisateur/" + this.$route.params.id, {
          id_role: this.id_role
        })
        .then(() => {
          this.$router.push("/utilisateur");
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.getRoles();
    this.getUtilisateur()
  },
  beforeCreate() {
    if (!this.$session.exists()) {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>

</style>