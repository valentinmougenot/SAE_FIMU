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
                :items="rolesSelect"
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
import {get, put} from "@/services/axios.service.js";
import {mapState} from "vuex";
export default {
  name: "UtilisateurEditView",
  data: () => ({
    id_role: null,
  }),
  methods: {
    async getUtilisateur() {
      await get("utilisateur/" + this.$route.params.id)
        .then(response => {
          this.id_role = response.data.id_role;
        })
        .catch(error => {
          console.log(error);
        });
    },
    editUtilisateur() {
      put("utilisateur/" + this.$route.params.id, {
          id_role: this.id_role
        })
        .then(() => {
          this.$router.push("/utilisateur");
        })
        .catch(error => {
          alert(error.response.data.message);
        });
    }
  },
  computed: {
    ...mapState(['roles']),
    rolesSelect() {
      return this.roles.map(role => {
        return {
          value: role.id,
          text: role.libelle
        }
      })
    }
  },
  created() {
    this.getUtilisateur()
    if (this.roles.length === 0) {
      this.$store.dispatch('getRoles');
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

</style>