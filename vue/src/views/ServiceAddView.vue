<template>
  <v-container>
    <v-form>
      <v-row>
        <v-col cols = "12">
          <v-card>
            <v-card-title>
              <h1 class="display-1">Ajouter une service</h1>
            </v-card-title>
            <v-card-text>
              <v-text-field
                  v-model="service.libelle"
                  label="Nom de la service"
                  required
              ></v-text-field>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="addService">Ajouter</v-btn>
              </v-card-actions>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import Vue from "vue";
export default {
  name: "ServiceAddView",
  data: () => {
    return {
      service: {
        libelle: "",
      }
    }
  },
  methods: {
    addService() {
      Vue.axios.post('http://localhost:3000/service', this.service)
        .then(() => {
          this.$store.dispatch('getServices');
          this.$store.dispatch('getStands');
          this.$router.push('/service');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
</script>

<style scoped>

</style>