<template>
  <div :style="image">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>
              <h1 class="display-1">Login</h1>
            </v-card-title>
            <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  v-model="identifiant"
                  :rules="identifiantRules"
                  label="Identifiant"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="passwordRules"
                  :type="showPassword ? 'text' : 'password'"
                  label="Mot de passe"
                  required
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="login">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  name: "LoginView",
  data: () => ({
    valid: true,
    identifiant: "",
    password: "",
    showPassword: false,
    identifiantRules: [
      (v) => !!v || "L'identifiant est requis",
      (v) => v.length <= 20 || "L'identifiant doit être inférieur à 20 caractères",
    ],
    passwordRules: [
      (v) => !!v || "Le mot de passe est requis",
      (v) => v.length <= 20 || "Le mot de passe doit être inférieur à 20 caractères",
    ],
    image: {backgroundImage: "url(https://www.radiofrance.fr/s3/cruiser-production/2022/05/4b1058e7-44aa-4c60-a88d-f5b9a7ad788e/1200x680_fimu_2022_generik_1920_x_1080.jpg)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      height: "100vh"},
  }),
  methods: {
    login() {
      Vue.axios.post("http://localhost:3000/utilisateur/login", {
        identifiant: this.identifiant,
        mot_de_passe: this.password,
      }).then((response) => {
        if (response.data.identifiant) {
          this.$router.push("/artiste");
        } else {
          alert("Identifiant ou mot de passe incorrect");
        }
      });
      }
    },
}
</script>

<style scoped>

</style>