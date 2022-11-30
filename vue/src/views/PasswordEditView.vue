<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h1 class="display-1">Modifier mon mot de passe</h1>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model=this.$route.params.id
                readonly></v-text-field>
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                label="Mot de passe"
                required
                type="password"
              ></v-text-field>
              <v-text-field
                v-model="passwordConfirm"
                :rules="passwordConfirmRules"
                label="Confirmation du mot de passe"
                required
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="updatePassword">Modifier</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import bcrypt from "bcryptjs";
import axios from "axios";
export default {
  name: "PasswordEditView",
  data: () => ({
    valid: true,
    password: "",
    passwordRules: [
      v => !!v || "Le mot de passe est requis",
      v => (v && v.length >= 8) || "Le mot de passe doit contenir au moins 8 caractères"
    ],
    passwordConfirm: "",
  }),

  methods: {
    updatePassword() {
      if (this.password === this.passwordConfirm) {
        const p = {
          mot_de_passe: bcrypt.hashSync(this.password, 10)
        }
        return axios.put("http://localhost:3000/utilisateur/" + this.$route.params.id, p)
          .then(() => {
            this.$router.push("/utilisateur");
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        alert("Les mots de passe ne correspondent pas");
      }
    }
  }
}
</script>

<style scoped>

</style>