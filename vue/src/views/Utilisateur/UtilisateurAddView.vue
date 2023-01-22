<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h1 class="display-1">Ajouter un utilisateur</h1>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                  v-model="utilisateur.identifiant"
                  label="Identifiant"
                  required
              ></v-text-field>
              <v-select
                  v-model="utilisateur.id_role"
                  :items="rolesSelect"
                  label="Rôle de l'utilisateur"
                  required>
              </v-select>
              <v-text-field
                  v-model="utilisateur.mot_de_passe"
                  label="Mot de passe"
                  :rules="passwordRules"
                  type="password"
                  required
                  ></v-text-field>
              <v-text-field
                  v-model="confirm_password"
                  label="Confirmer le mot de passe"
                  :rules="passwordRules"
                  type="password"
                  required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="addUtilisateur">Ajouter</v-btn>
            </v-card-actions>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import bcrypt from "bcryptjs";
import {post} from "@/services/axios.service.js";
import {mapState} from "vuex";
export default {
  name: "UtilisateurAddView",
  data: () => ({
    utilisateur: {
      identifiant: null,
      mot_de_passe: null,
      id_role: null
    },
    confirm_password: null,
    passwordRules: [
      v => !!v || "Le mot de passe est requis",
      v => (v && v.length >= 8) || "Le mot de passe doit contenir au moins 8 caractères"
    ],
  }),
  methods: {
    addUtilisateur() {
      if (this.utilisateur.mot_de_passe === this.confirm_password) {
        this.utilisateur.mot_de_passe = bcrypt.hashSync(this.utilisateur.mot_de_passe, 10);
        post("utilisateur", this.utilisateur)
            .then(() => {
              this.$router.push("/utilisateur");
            })
            .catch(error => {
              alert(error.response.data.message);
            });
      } else {
        alert("Les mots de passe ne correspondent pas");
      }
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